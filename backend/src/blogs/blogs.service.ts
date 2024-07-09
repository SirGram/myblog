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
    return this.blogModel
      .find()
      .populate({ path: 'user', select: '-password -email -blogs -settings' })
      
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

  async remove(id: string): Promise<Blog> {
    return this.blogModel.findByIdAndDelete(id);
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
    return this.blogCommentModel.findByIdAndDelete(id);
  }
}
