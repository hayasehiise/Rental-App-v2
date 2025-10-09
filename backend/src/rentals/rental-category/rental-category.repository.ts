import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RentalCategory } from './rental-category.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

interface CategoryFilters {
  search?: string;
  page?: number;
  limit?: number;
  showAll?: boolean;
}

@Injectable()
export class RentalCategoryRepository {
  constructor(
    @InjectRepository(RentalCategory)
    private readonly categoryRepo: Repository<RentalCategory>,
  ) {}

  private buildQuery(
    filters: CategoryFilters,
  ): SelectQueryBuilder<RentalCategory> {
    const builder = this.categoryRepo
      .createQueryBuilder('categories')
      .leftJoinAndSelect('categories.rentals', 'rentals')
      .orderBy('categories.createdAt', 'DESC');

    if (filters.search) {
      builder.andWhere('categories.name LIKE :search', {
        search: `%${filters.search}%`,
      });
    }

    return builder;
  }

  async findAll(filters: CategoryFilters) {
    const builder = this.buildQuery(filters);

    if (filters.showAll) {
      const data = await builder.getMany();
      return {
        message: 'All Categories data fetch successfully',
        total: data.length,
        data,
      };
    }

    // pagination (Hybrid mode)
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, total] = await builder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPage = Math.ceil(total / limit);

    return {
      message: 'Categories fetch successfully',
      total,
      page,
      total_page: totalPage,
      limit,
      data,
    };
  }
}
