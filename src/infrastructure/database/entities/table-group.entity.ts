import { IArea, IReservation, ITableGroup } from '@domain';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from './area.entity';
import { Reservation } from './reservation.entity';

@Entity()
export class TableGroup implements ITableGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  min: number;

  @Column({ type: 'int' })
  max: number;

  @ManyToOne(() => Area, (area) => area.capacity, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  area: IArea;

  @OneToMany(() => Reservation, (reservation) => reservation.area, {
    cascade: true,
  })
  reservations: IReservation[];
}
