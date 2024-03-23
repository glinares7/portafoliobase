import { Emailcliente } from 'src/emailcliente/entities/emailcliente.entity';
import { Listacompra } from 'src/listacompra/entities/listacompra.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Compra {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: 0 })
  sessioncompra: number;

  @Column({ default: '' })
  estadoentrega: string;

  @Column({ default: '' })
  lugarentrega: string;

  @Column({ default: '' })
  pago: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP AT TIME ZONE America/Lima',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP AT TIME ZONE America/Lima',
  })
  updateAt: Date;

  @OneToMany(() => Listacompra, (listacompra) => listacompra.compra)
  listacompra: Listacompra[];

  @ManyToOne(() => Emailcliente, (emailcliente) => emailcliente.compra)
  emailcliente: Emailcliente;
}
