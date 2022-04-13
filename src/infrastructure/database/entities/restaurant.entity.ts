import { IArea, IRestaurant } from '@domain';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from './area.entity';
import { ReservationService } from './reservation-service.entity';

@Entity()
export class Restaurant implements IRestaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'int' })
  openHour: number;

  @Column({ type: 'int' })
  closeHour: number;

  @Column({ type: 'int' })
  averageMealDuration: number;

  @OneToMany(() => Area, (area) => area.restaurant, {
    cascade: true,
  })
  areas: IArea[];

  @OneToOne(
    () => ReservationService,
    (reservationService) => reservationService.restaurant,
    { nullable: true },
  )
  reservationServices: ReservationService;
}
