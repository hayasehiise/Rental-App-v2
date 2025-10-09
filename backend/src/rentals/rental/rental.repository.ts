import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from './rental.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

interface RentalFilters {
  search?: string;
  categoryId?: number;
  page?: number;
  limit?: number;
  showAll?: boolean;
}

@Injectable()
export class RentalRepository {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepo: Repository<Rental>,
  ) {}

  private buildQuery(filters: RentalFilters): SelectQueryBuilder<Rental> {
    const builder = this.rentalRepo
      .createQueryBuilder('rental')
      .leftJoinAndSelect('rental.category', 'category')
      .leftJoinAndSelect('rental.units', 'units')
      .orderBy('rental.createdAt', 'DESC');

    if (filters.search) {
      builder.andWhere('rental.name LIKE :search', {
        search: `%${filters.search}%`,
      });
    }

    if (filters.categoryId) {
      builder.andWhere('category.id = :categoryId', {
        categoryId: filters.categoryId,
      });
    }

    return builder;
  }

  async findAll(filters: RentalFilters) {
    const builder = this.buildQuery(filters);

    if (filters.showAll) {
      const data = await builder.getMany();
      return {
        message: 'All Rental data fetch successfully',
        total: data.length,
        data,
      };
    }

    // pagination (hybrid mode)
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, total] = await builder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPage = Math.ceil(total / limit);

    return {
      message: 'Rental Fetch Successfully',
      total,
      page,
      total_page: totalPage,
      limit,
      data,
    };
  }
}
