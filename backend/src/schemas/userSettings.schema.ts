import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSettings {
  @Prop({ type: String })
  about?: string;

  @Prop({ type: String })
  avatarImage?: string;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
