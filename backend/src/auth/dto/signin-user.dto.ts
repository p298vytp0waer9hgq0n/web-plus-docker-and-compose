import { IsNotEmpty, Length } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  @IsNotEmpty()
  password: string;
}
