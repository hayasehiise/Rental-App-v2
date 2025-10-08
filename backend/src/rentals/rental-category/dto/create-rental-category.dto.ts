import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRentalCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
