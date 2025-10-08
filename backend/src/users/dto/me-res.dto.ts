import { Expose } from 'class-transformer';
import { IsDateString, IsEmail, IsNumber, IsString } from 'class-validator';
import { UserRole } from 'src/common/enum/user-role.enum';

export class UserResDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  role: UserRole;

  @Expose()
  @IsDateString()
  createdAt: Date;

  @Expose()
  @IsDateString()
  updateAt: Date;
}
