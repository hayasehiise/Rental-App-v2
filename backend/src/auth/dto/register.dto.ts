import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/common/enum/user-role.enum';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  role?: UserRole;
}
