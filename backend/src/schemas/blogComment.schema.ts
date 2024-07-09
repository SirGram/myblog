import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Blog } from './blog.schema';

export type BlogCommentDocument = HydratedDocument<BlogComment>;

@Schema()
export class BlogComment {
  @Prop({ type: String, required: true })
  user: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Date, default: Date.now })
  creationDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  blog: Blog;
}

export const BlogCommentSchema = SchemaFactory.createForClass(BlogComment);
