import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogCommentsService, BlogsService } from './blogs.service';
import { BlogCommentsController, BlogsController } from './blogs.controller';
import { Blog, BlogSchema } from '../schemas/blog.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { BlogComment, BlogCommentSchema } from 'src/schemas/blogComment.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: User.name, schema: UserSchema },
      { name: BlogComment.name, schema: BlogCommentSchema },
    ]),
  ],
  controllers: [BlogsController, BlogCommentsController],
  providers: [BlogsService, BlogCommentsService],
})
export class BlogsModule {}
