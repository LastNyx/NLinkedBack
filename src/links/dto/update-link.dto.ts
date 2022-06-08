import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import LinkType from '../enum/links-type.enum';
import { CreateLinkDto } from './create-link.dto';

export class UpdateLinkDto extends PartialType(CreateLinkDto) {
  @IsString()
  link: string;

}
