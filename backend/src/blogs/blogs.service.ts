import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '../schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { BlogComment } from 'src/schemas/blogComment.schema';
import { CreateBlogCommentDto } from './dto/create-blogComment.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(BlogComment.name) private blogCommentModel: Model<BlogComment>,
  ) {}

  async create({ userId, ...createBlogDto }: CreateBlogDto): Promise<Blog> {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) throw new HttpException('User Not Found', 404);
    const newBlog = new this.blogModel({ ...createBlogDto, user: userId });
    const savedBlog = await newBlog.save();
    await findUser.updateOne({
      $push: {
        blogs: savedBlog._id,
      },
    });
    return savedBlog;
  }

  async findAll(): Promise<Blog[]> {
    await this.cleanUpCommentReferences();
    return this.blogModel
      .find()
      .populate({ path: 'user', select: '-password -email -blogs -settings' });
  }

  async findOne(id: string): Promise<Blog> {
    return this.blogModel
      .findById(id)
      .populate({ path: 'user', select: '-password -email' })
      .populate({
        path: 'comments',
        options: { sort: { creationDate: -1 } }, // Sort comments by creation date, newest first
      })
      .exec();
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(id, updateBlogDto).exec();
  }

  async upvote(id: string, clientId: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id);
    if (!blog) throw new HttpException('Blog Not Found', 404);
    if (blog.upvotedBy.includes(clientId)) {
      throw new HttpException('Already upvoted', 400);
    }

    blog.likes += 1;
    blog.upvotedBy.push(clientId);
    return blog.save();
  }

  async downvote(id: string, clientId: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id);
    if (!blog) throw new HttpException('Blog Not Found', 404);
    if (!blog.upvotedBy.includes(clientId)) {
      throw new HttpException('Not upvoted', 400);
    }

    blog.likes -= 1;
    blog.upvotedBy = blog.upvotedBy.filter((upvotedBy) => upvotedBy !== clientId);
    return blog.save();
  }

  async remove(id: string): Promise<Blog> {
    return this.blogModel.findByIdAndDelete(id);
  }

  private async cleanUpCommentReferences(): Promise<void> {
    const blogs = await this.blogModel.find();

    for (const blog of blogs) {
      const existingComments = await this.blogCommentModel.find({
        _id: { $in: blog.comments },
      });

      const existingCommentIds = existingComments.map((comment) =>
        comment._id.toString(),
      );

      const updatedComments = blog.comments.filter((commentId) =>
        existingCommentIds.includes(commentId.toString()),
      );

      if (updatedComments.length !== blog.comments.length) {
        await this.blogModel.findByIdAndUpdate(blog._id, {
          $set: { comments: updatedComments },
        });
      }
    }
  }
}

@Injectable()
export class BlogCommentsService {
  constructor(
    @InjectModel(BlogComment.name) private blogCommentModel: Model<BlogComment>,
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
  ) {}

  async create(
    blogId,
    createBlogCommentDto: CreateBlogCommentDto,
  ): Promise<BlogComment> {
    const findBlog = await this.blogModel.findById(blogId);
    if (!findBlog) throw new HttpException('Blog Not Found', 404);
    const newBlogComment = new this.blogCommentModel({
      ...createBlogCommentDto,
      blog: blogId,
    });
    const savedBlogComment = await newBlogComment.save();
    await findBlog.updateOne({
      $push: {
        comments: savedBlogComment._id,
      },
    });
    return savedBlogComment;
  }
  async findAll(blogId: string) {
    return this.blogCommentModel.find({ blog: blogId });
  }

  async remove(id: string) {
    const comment = await this.blogCommentModel.findById(id);
    if (!comment) {
      throw new HttpException('Comment not found', 404);
    }

    // Remove the comment from the BlogComment collection and Blog document
    await this.blogCommentModel.findByIdAndDelete(id);

    await this.blogModel.findByIdAndUpdate(comment.blog, {
      $pull: { comments: id },
    });

    return comment;
  }
}
