import { IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto {
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  password: string;
}