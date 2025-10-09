/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from './rental.entity';
import { Repository } from 'typeorm';
import { RentalCategory } from '../rental-category/rental-category.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { RentalRepository } from './rental.repository';

@Injectable()
export class RentalService {
  constructor(
    private rentalRepository: RentalRepository,
    @InjectRepository(RentalCategory)
    private categoryRepo: Repository<RentalCategory>,
  ) {}

  async create(
    dto: CreateRentalDto,
  ): Promise<{ message: string; data: Rental }> {
    const existing = await this.rentalRepository['rentalRepo'].findOne({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException(`Rental name ${dto.name} already exists`);
    }

    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const rental = this.rentalRepository['rentalRepo'].create({
      name: dto.name,
      description: dto.description,
      category,
    });

    const saved = await this.rentalRepository['rentalRepo'].save(rental);

    return {
      message: 'Data rental berhasil ditambahkan',
      data: saved,
    };
  }

  async find(filters: any) {
    return this.rentalRepository.findAll(filters);
  }

  async update(id: number, dto: UpdateRentalDto) {
    const rental = await this.rentalRepository['rentalRepo'].findOne({
      where: { id },
    });

    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    if (dto.name && dto.name !== rental.name) {
      const existing = await this.rentalRepository['rentalRepo'].findOne({
        where: { name: dto.name },
      });

      if (existing) {
        throw new ConflictException(`Rental ${dto.name} already exists`);
      }
    }

    Object.assign(rental, dto);

    const updated = await this.rentalRepository['rentalRepo'].save(rental);

    return {
      message: 'Rental berhasil diupdate',
      data: updated,
    };
  }

  async remove(id: number) {
    const rental = await this.rentalRepository['rentalRepo'].findOne({
      where: { id },
    });

    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    const removed = await this.rentalRepository['rentalRepo'].remove(rental);

    return {
      message: 'Rental berhasil dihapus',
      data: removed,
    };
  }
}
