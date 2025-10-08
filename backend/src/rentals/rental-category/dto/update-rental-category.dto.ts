import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalCategoryDto } from './create-rental-category.dto';

export class UpdateRentalCategoryDto extends PartialType(
  CreateRentalCategoryDto,
) {}
