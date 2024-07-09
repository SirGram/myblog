import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Blog } from './blog.schema';
import { UserSettings } from './userSettings.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  fullname: string;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: false })
  avatarImg?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }] })
  blogs: Blog[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  settings: UserSettings;

  @Prop({ type: Date, default: Date.now })
  registrationDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
