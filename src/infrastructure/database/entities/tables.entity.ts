import { IArea, ITables } from '@domain';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from './area.entity';

@Entity()
export class Tables implements ITables {
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
}
