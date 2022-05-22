import { IArea, IReservation, ITableGroup } from '@domain';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';
import { Restaurant } from './restaurant.entity';
import { TableGroup } from './table-group.entity';

@Entity()
export class Area implements IArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @OneToMany(() => TableGroup, (tableGroup) => tableGroup.area, {
    cascade: true,
  })
  capacity: ITableGroup[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.areas, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  restaurant: Restaurant;

  @OneToMany(() => Reservation, (reservation) => reservation.area, {
    cascade: true,
  })
  reservations: IReservation[];
}
