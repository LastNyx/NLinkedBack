import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  /*@IsNotEmpty()
  images: Array<string>;

  @IsNotEmpty()
  links: Array<Object>;*/

  @IsArray()
  tags: Array<string>;

  
  images: Array<string>;
  links: Array<string>;
  secrets: Array<string>;
}
