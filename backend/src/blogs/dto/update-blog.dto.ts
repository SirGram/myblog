import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({
    description: 'The last edition date of the blog',
    example: '2024-05-30T12:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  readonly lastEditionDate: Date;
}
