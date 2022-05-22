import { IArea, IReservation, ITableGroup } from '@domain';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from './area.entity';
import { Restaurant } from './restaurant.entity';
import { TableGroup } from './table-group.entity';

@Entity()
export class Reservation implements IReservation {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reservations, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  restaurant: Restaurant;

  @Column({ type: 'int' })
  restaurantId: number;

  @Column({ type: 'varchar' })
  customer: string;

  @Column({ type: 'varchar' })
  date: string;

  @Column({ type: 'int' })
  fromHour: number;

  @Column({ type: 'int' })
  toHour: number;

  @Column({ type: 'int' })
  partySize: number;

  @ManyToOne(() => Area, (area) => area.reservations, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  area: IArea;

  @Column({ type: 'int' })
  areaId: number;

  @ManyToOne(() => TableGroup, (tableGroup) => tableGroup.reservations, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  tableGroup: ITableGroup;

  @Column({ type: 'int' })
  tableGroupId: number;
}
