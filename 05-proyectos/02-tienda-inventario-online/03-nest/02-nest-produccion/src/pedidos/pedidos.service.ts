import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';
import { Smartphone } from 'src/smartphone/entities/smartphone.entity';
import { Carritocompra } from 'src/carritocompra/entities/carritocompra.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Smartphone)
    private smartphoneRepository: Repository<Smartphone>,

    @InjectRepository(Carritocompra)
    private carritoCompraRepository: Repository<Carritocompra>,
  ) {}

  async create(
    idcarrito: number,
    idsmart: number,
    createPedidoDto: CreatePedidoDto,
  ) {
    const smartphone = await this.smartphoneRepository.findOneBy({
      id: idsmart,
    });
    const carritoCompra = await this.carritoCompraRepository.findOneBy({
      id: idcarrito,
    });

    if (smartphone) {
      const pedidos = this.pedidoRepository.create(createPedidoDto);
      pedidos.smartphone = smartphone;
      pedidos.subtotal = createPedidoDto.cantidad * smartphone.offer2;
      pedidos.carritocompra = carritoCompra;

      await this.pedidoRepository.save(pedidos);
      return pedidos;
    }
  }

  findAll() {
    return this.pedidoRepository.find({
      relations: ['carritocompra'],
      order: {
        id: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.pedidoRepository.find({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, idsmart: number, updatePedidoDto: UpdatePedidoDto) {
    const smartphone = await this.smartphoneRepository.findOneBy({
      id: idsmart,
    });

    updatePedidoDto.subtotal = updatePedidoDto.cantidad * smartphone.offer2;
    return this.pedidoRepository.update(id, updatePedidoDto);
  }

  remove(id: number) {
    return this.pedidoRepository.delete(id);
  }
}
