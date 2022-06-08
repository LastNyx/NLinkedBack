import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
  
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
  
}