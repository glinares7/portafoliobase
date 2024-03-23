import { Carritocompra } from 'src/carritocompra/entities/carritocompra.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('jsonb', { nullable: true })
  smartphone: Record<string, any>;

  @Column({ default: 1 })
  cantidad: number;

  @Column('decimal', { default: 0 })
  subtotal: number;

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

  @ManyToOne(() => Carritocompra, (carritoCompra) => carritoCompra.pedidos)
  carritocompra: Carritocompra;
}
