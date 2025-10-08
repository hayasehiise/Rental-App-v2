import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rental } from '../rental/rental.entity';

@Entity('rental_categories')
export class RentalCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Rental, (rental) => rental.category)
  rentals: Rental[];
}
