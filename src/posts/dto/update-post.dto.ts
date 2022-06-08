import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  tags: Array<string>;
  
  images: Array<string>;
  links: Array<string>;
  secrets: Array<string>;
}
