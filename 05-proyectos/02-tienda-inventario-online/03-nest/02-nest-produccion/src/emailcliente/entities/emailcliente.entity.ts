import { Compra } from 'src/compras/entities/compra.entity';
import { Perfilcliente } from 'src/perfilcliente/entities/perfilcliente.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Emailcliente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  emailcliente: string;

  @Column({ default: '' })
  passcliente: string;

  @Column({ default: '' })
  bufferiv: string;

  @Column({ default: 0 })
  estado: number;

  @Column({ default: 1 })
  sessioncliente: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP AT TIME ZONE America/Lima',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP AT TIME ZONE America/Lima',
  })
  updatedAt: Date;

  @OneToOne(() => Perfilcliente, (perfilcliente) => perfilcliente.emailcliente)
  @JoinColumn()
  perfilcliente: Perfilcliente;

  @OneToMany(() => Compra, (compra) => compra.emailcliente)
  compra: Compra[];
}
