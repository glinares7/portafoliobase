import { Photo } from 'src/photo/entities/photo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Dni } from '../dni/entities/dni.entity';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Photo, (photo) => photo.cliente)
  photos: Photo[];

  @OneToOne(() => Dni)
  @JoinColumn()
  dni: Dni;
}
