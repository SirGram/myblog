import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogCommentDto {
  @ApiProperty({
    description: 'Comment content',
    example: 'This is a great blog post!',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Username of comment author',
    example: 'Cool_guy100',
  })
  @IsString()
  @IsNotEmpty()
  user: string;
}