import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RentalUnit } from '../rental-unit/rental-unit.entity';

@Entity('rental_images')
export class RentalImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RentalUnit, (unit) => unit.images, { onDelete: 'CASCADE' })
  unit: RentalUnit;

  @Column()
  url: string;

  @Column({ nullable: true })
  alt?: string;
}
