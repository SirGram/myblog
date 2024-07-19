import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { BlogComment } from './blogComment.schema';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: String })
  image?: string;

  @Prop({ required: true, default: Date.now })
  creationDate: Date;

  @Prop({ type: Date })
  lastEditionDate?: Date;

  @Prop({ type: Boolean, required: true, default: false })
  published: boolean;

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({ type: [String] , default: []})
  upvotedBy: string[];

  @Prop({ type: Number, default: 0 })
  visits: number;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'BlogComment', default: [] },
    ],
  })
  comments: BlogComment[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
