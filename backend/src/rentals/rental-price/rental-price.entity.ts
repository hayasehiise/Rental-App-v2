import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RentalUnit } from '../rental-unit/rental-unit.entity';
import { PriceType } from 'src/common/enum/price-type.enum';

@Entity('rental_prices')
export class RentalPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RentalUnit, (unit) => unit.prices, { onDelete: 'CASCADE' })
  unit: RentalUnit;

  @Column({ type: 'enum', enum: PriceType, default: PriceType.FLAT })
  priceType: PriceType;

  @Column({ type: 'int', nullable: true })
  dayOfWeek?: number;

  @Column({ type: 'int', nullable: true })
  durationDay?: number;

  @Column({ type: 'int', nullable: true })
  pax?: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
