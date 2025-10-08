import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RentalCategory } from '../rental-category/rental-category.entity';
import { RentalUnit } from '../rental-unit/rental-unit.entity';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => RentalCategory, (category) => category.rentals, {
    onDelete: 'CASCADE',
  })
  category: RentalCategory;

  @OneToMany(() => RentalUnit, (unit) => unit.rental)
  units: RentalUnit[];
}
