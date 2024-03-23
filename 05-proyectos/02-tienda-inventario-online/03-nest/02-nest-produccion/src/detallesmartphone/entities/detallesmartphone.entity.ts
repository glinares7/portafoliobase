import { Smartphone } from 'src/smartphone/entities/smartphone.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Detallesmartphone {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('decimal', { default: 0 })
  ancho: number;
  @Column('decimal', { default: 0 })
  largo: number;
  @Column({ default: '' })
  garantia: string;
  @Column({ default: '' })
  modelo: string;
  @Column({ default: '' })
  color: string;
  @Column('decimal', { default: 0 })
  pantalla: number;
  @Column({ default: 0 })
  memoriaram: number;
  @Column({ default: 0 })
  memoriainterna: number;

  @Column({ default: '' })
  descripcion: string;

  @OneToOne(() => Smartphone, (smartphone) => smartphone.detallesmartphone)
  @JoinColumn()
  smartphone: Smartphone;
}
