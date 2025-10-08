import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async create(
    dto: CreateRentalCategoryDto,
  ): Promise<{ message: string; data: RentalCategory }> {
    const existing = await this.categoryRepo.findOne({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException(`Category Name ${dto.name} Already Exists`);
    }

    const category = this.categoryRepo.create(dto);
    const save = await this.categoryRepo.save(category);

    return {
      message: 'Data berhasil ditambahkan',
      data: save,
    };
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
  ): Promise<{ message: string; data: RentalCategory }> {
    const existing = await this.categoryRepo.findOne({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException(`Category Name ${dto.name} Already Exists`);
    }

    const category = await this.categoryRepo.preload({
      id,
      ...dto,
    });

    if (!category) {
      throw new NotFoundException('Rental Category not found');
    }

    const save = await this.categoryRepo.save(category);

    return {
      message: 'Data berhasil diupdate',
      data: save,
    };
  }

  async remove(id: number): Promise<{ message: string; data: RentalCategory }> {
    const category = await this.categoryRepo.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Rental Category not found');
    }

    const remove = await this.categoryRepo.remove(category);

    return {
      message: 'Data berhasil dihapus',
      data: remove,
    };
  }
}
