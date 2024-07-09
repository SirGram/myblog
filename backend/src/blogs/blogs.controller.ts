import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags } from '@nestjs/swagger';
import { BlogCommentsService } from './blogs.service';
import { CreateBlogCommentDto } from './dto/create-blogComment.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}

@ApiTags('blog comments')
@Controller('blogs/:blogId/comments')
export class BlogCommentsController {
  constructor(private readonly blogCommentsService: BlogCommentsService) {}

  @Get()
  findAll(@Param('blogId') blogId: string) {
    return this.blogCommentsService.findAll(blogId);
  }

  @Post()
  createOne(
    @Param('blogId') blogId: string,
    @Body() createBlogCommentDto: CreateBlogCommentDto,
  ) {
    return this.blogCommentsService.create(blogId, createBlogCommentDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':commentId')
  remove( @Param('commentId') commentId: string) {
    return this.blogCommentsService.remove( commentId);
  }
}
