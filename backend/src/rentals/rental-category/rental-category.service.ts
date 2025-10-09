/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RentalCategory } from './rental-category.entity';
import { CreateRentalCategoryDto } from './dto/create-rental-category.dto';
import { UpdateRentalCategoryDto } from './dto/update-rental-category.dto';
import { RentalCategoryRepository } from './rental-category.repository';

@Injectable()
export class RentalCategoryService {
  constructor(private categoryRepository: RentalCategoryRepository) {}

  async create(
    dto: CreateRentalCategoryDto,
  ): Promise<{ message: string; data: RentalCategory }> {
    const existing = await this.categoryRepository['categoryRepo'].findOne({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException(`Category Name ${dto.name} Already Exists`);
    }

    const category = this.categoryRepository['categoryRepo'].create(dto);
    const save = await this.categoryRepository['categoryRepo'].save(category);

    return {
      message: 'Data berhasil ditambahkan',
      data: save,
    };
  }

  async find(filters: any) {
    return this.categoryRepository.findAll(filters);
  }

  async update(
    id: number,
    dto: UpdateRentalCategoryDto,
  ): Promise<{ message: string; data: RentalCategory }> {
    const existing = await this.categoryRepository['categoryRepo'].findOne({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException(`Category Name ${dto.name} Already Exists`);
    }

    const category = await this.categoryRepository['categoryRepo'].preload({
      id,
      ...dto,
    });

    if (!category) {
      throw new NotFoundException('Rental Category not found');
    }

    const save = await this.categoryRepository['categoryRepo'].save(category);

    return {
      message: 'Data berhasil diupdate',
      data: save,
    };
  }

  async remove(id: number): Promise<{ message: string; data: RentalCategory }> {
    const category = await this.categoryRepository['categoryRepo'].findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Rental Category not found');
    }

    const remove =
      await this.categoryRepository['categoryRepo'].remove(category);

    return {
      message: 'Data berhasil dihapus',
      data: remove,
    };
  }
}
