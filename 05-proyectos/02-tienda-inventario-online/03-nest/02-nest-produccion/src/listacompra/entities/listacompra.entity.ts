import { Compra } from 'src/compras/entities/compra.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Listacompra {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('jsonb', { nullable: true })
  carritocompra: Record<string, any>;

  @ManyToOne(() => Compra, (compra) => compra.listacompra)
  compra: Compra;
}
