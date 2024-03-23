import { Pedido } from 'src/pedidos/entities/pedido.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Carritocompra {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('decimal', { default: 0 })
  total: number;

  @Column({ default: '' })
  sessioncarrito: string;

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

  @OneToMany(() => Pedido, (pedido) => pedido.carritocompra)
  pedidos: Pedido[];

  // @ManyToOne(() => Compra, (compra) => compra.carritocompra)
  // compras: Compra;
}
