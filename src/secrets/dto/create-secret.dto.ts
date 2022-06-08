import { IsString } from "class-validator";

export class CreateSecretDto {

  @IsString()
  link: string;

}
