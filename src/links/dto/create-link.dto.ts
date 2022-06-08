import { IsEnum, IsString } from "class-validator";
import LinkType from "../enum/links-type.enum";

export class CreateLinkDto {

  @IsString()
  link: string;

  type: LinkType
}
