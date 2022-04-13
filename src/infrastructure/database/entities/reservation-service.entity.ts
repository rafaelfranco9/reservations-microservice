import { IReservationService, IWeekdays } from '@domain';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class ReservationService implements IReservationService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bool' })
  isActive: boolean;

  @Column({ type: 'simple-json' })
  weekdays: IWeekdays;

  @Column({ type: 'int' })
  fromHour: number;

  @Column({ type: 'int' })
  toHour: number;

  @Column('varchar', { array: true })
  inactiveDates: string[];

  @Column({ type: 'int' })
  restaurantId: number;

  @JoinColumn()
  @OneToOne(() => Restaurant, (restaurant) => restaurant.reservationServices)
  restaurant: Restaurant;
}
