import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RentalCategory } from './rental-category.entity';
import { CreateRentalCategoryDto } from './dto/create-rental-category.dto';
import { UpdateRentalCategoryDto } from './dto/update-rental-category.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RentalCategoryService {
  constructor(
    @InjectRepository(RentalCategory)
    private categoryRepo: Repository<RentalCategory>,
  ) {}

  async create(dto: CreateRentalCategoryDto): Promise<RentalCategory> {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async findAll(): Promise<RentalCategory[]> {
    return this.categoryRepo.find({
      relations: ['rentals'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<RentalCategory> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['rentals'],
    });
    if (!category) {
      throw new NotFoundException('Category Not Found');
    }

    return category;
  }

  async update(
    id: number,
    dto: UpdateRentalCategoryDto,
  ): Promise<RentalCategory> {
    const category = await this.categoryRepo.preload({
      id,
      ...dto,
    });

    if (!category) {
      throw new NotFoundException('Rental Category not found');
    }

    return this.categoryRepo.save(category);
  }

  async remove(id: number): Promise<RentalCategory> {
    const category = await this.categoryRepo.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Rental Category not found');
    }

    return this.categoryRepo.remove(category);
  }
}
