import { Dni } from 'src/cliente/dni/entities/dni.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('banco')
export class Banco {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  transaccion: number;

  @Column()
  nombre: string;
  @Column()
  fecha: Date;

  @ManyToMany(() => Dni, (dni) => dni.bancos)
  dnis: Dni[];
}
