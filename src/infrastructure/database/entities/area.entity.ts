import { IArea, ITables } from '@domain';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { Tables } from './tables.entity';

@Entity()
export class Area implements IArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @OneToMany(() => Tables, (table) => table.area, {
    cascade: true,
  })
  capacity: ITables[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.areas, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  restaurant: Restaurant;
}