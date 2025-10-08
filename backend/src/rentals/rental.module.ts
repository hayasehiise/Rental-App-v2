import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalCategory } from './rental-category/rental-category.entity';
import { Rental } from './rental/rental.entity';
import { RentalUnit } from './rental-unit/rental-unit.entity';
import { RentalPrice } from './rental-price/rental-price.entity';
import { RentalImage } from './rental-image/rental-image.entity';
import { RentalCategoryService } from './rental-category/rental-category.service';
import { RentalService } from './rental/rental.service';
import { RentalUnitService } from './rental-unit/rental-unit.service';
import { RentalPriceService } from './rental-price/rental-price.service';
import { RentalImageService } from './rental-image/rental-image.service';
import { RentalCategoryController } from './rental-category/rental-category.controller';
import { RentalController } from './rental/rental.controller';
import { RentalUnitController } from './rental-unit/rental-unit.controller';
import { RentalPriceController } from './rental-price/rental-price.controller';
import { RentalImageController } from './rental-image/rental-image.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RentalCategory,
      Rental,
      RentalUnit,
      RentalPrice,
      RentalImage,
    ]),
  ],
  controllers: [
    RentalCategoryController,
    RentalController,
    RentalUnitController,
    RentalPriceController,
    RentalImageController,
  ],
  providers: [
    RentalCategoryService,
    RentalService,
    RentalUnitService,
    RentalPriceService,
    RentalImageService,
  ],
  exports: [TypeOrmModule],
})
export class RentalModule {}
