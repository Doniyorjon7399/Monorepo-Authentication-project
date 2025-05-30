import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  @IsString()
  lastname: string;
  email: string;
  @IsString()
  password: string;
}
