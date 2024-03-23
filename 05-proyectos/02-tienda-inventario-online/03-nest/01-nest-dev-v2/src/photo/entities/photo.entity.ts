import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.photos)
  cliente: Cliente;
}
