import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateSecretDto } from './create-secret.dto';

export class UpdateSecretDto extends PartialType(CreateSecretDto) {
  @IsString()
  link: string;
}
