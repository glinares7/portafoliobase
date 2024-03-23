import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  firsName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
