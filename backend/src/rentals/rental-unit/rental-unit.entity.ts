import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rental } from '../rental/rental.entity';
import { RentalPrice } from '../rental-price/rental-price.entity';
import { RentalImage } from '../rental-image/rental-image.entity';

@Entity('rental_units')
export class RentalUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Rental, (rental) => rental.units, { onDelete: 'CASCADE' })
  rental: Rental;

  @OneToMany(() => RentalPrice, (price) => price.unit)
  prices: RentalPrice;

  @OneToMany(() => RentalImage, (image) => image.unit)
  images: RentalImage[];
}
