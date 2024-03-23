import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Smartphone {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  picture: string;

  @Column()
  title: string;

  @Column()
  from: string;

  @Column({ default: 0 })
  offer1: number;

  @Column()
  offer2: number;

  @Column({ default: 0 })
  current: number;
}
