import { Detallesmartphone } from 'src/detallesmartphone/entities/detallesmartphone.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('decimal', { default: 0 })
  offer1: number;

  @Column('decimal', { default: 0 })
  offer2: number;

  @Column('decimal', { default: 0 })
  current: number;

  @OneToOne(
    () => Detallesmartphone,
    (detallesmartphone) => detallesmartphone.smartphone,
  )
  detallesmartphone: Detallesmartphone;
}
