// import { Photo } from 'src/photo/entities/photo.entity';
import { Banco } from 'src/cliente/banco/entities/banco.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
  // JoinColumn,
} from 'typeorm';

@Entity('dni')
export class Dni {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nro: number;

  @Column()
  venc: Date;

  @OneToOne(() => Cliente, (cliente) => cliente.dni)
  cliente: Cliente;
  //   @OneToMany(() => Photo, (photo) => photo.cliente)
  //   photos: Photo[];
  @ManyToMany(() => Banco, (banco) => banco.dnis)
  @JoinTable()
  bancos: Banco[];
}
