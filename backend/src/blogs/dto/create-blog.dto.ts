import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDate,
  IsArray,
  IsNumber,
  IsMongoId,
  isEmail,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Full name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({
    description: 'Email',
    example: 'email@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  content: string;
}

export class CreateBlogDto {
  @ApiProperty({
    description: 'The title of the blog',
    example: 'Sample Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content of the blog in MARKDOWN',
    example: 'Lorem ipsum dolor sit amet',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The ID of the user who created the blog',
    example: '613f8e96b97e5a16d8ccf5d4',
  })
  @IsMongoId()
  userId: string;

  @ApiProperty({
    description: 'The URL of the image associated with the blog',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Indicates if the blog is published',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  published: boolean;

  @ApiProperty({
    description: 'The number of likes received by the blog',
    example: 10,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  likes?: number;

  @ApiProperty({
    description: 'The number of visits received by the blog',
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  visits?: number;
}
