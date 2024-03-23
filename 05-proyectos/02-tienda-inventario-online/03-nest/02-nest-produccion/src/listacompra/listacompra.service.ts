import { Injectable } from '@nestjs/common';
import { CreateListacompraDto } from './dto/create-listacompra.dto';
import { UpdateListacompraDto } from './dto/update-listacompra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Listacompra } from './entities/listacompra.entity';
import { Repository } from 'typeorm';
import { Carritocompra } from 'src/carritocompra/entities/carritocompra.entity';
import { Compra } from 'src/compras/entities/compra.entity';

@Injectable()
export class ListacompraService {
  constructor(
    @InjectRepository(Listacompra)
    private listaCompraRepository: Repository<Listacompra>,
    @InjectRepository(Carritocompra)
    private carritoCompraRepository: Repository<Carritocompra>,
    @InjectRepository(Compra)
    private compraRepository: Repository<Compra>,
  ) {}
  async create(createListacompraDto: CreateListacompraDto) {
    const resCarritoCompra = await this.carritoCompraRepository.find({
      where: {
        sessioncarrito: createListacompraDto.sessioncarrito,
      },
      order: {
        pedidos: {
          id: 'DESC',
        },
      },
      relations: {
        pedidos: true,
      },
    });

    //*listamos tabla compra
    createListacompraDto.carritocompra = resCarritoCompra[0];

    const resCompraSucessGet = await this.compraRepository.findOneBy({
      sessioncompra: createListacompraDto.sessioncompra,
    });

    // console.log('tamare ya pe ', resCompraSucessGet);

    //* agregamos listacompra como relations a compra

    if (resCompraSucessGet) {
      const listaCompraRelations =
        await this.listaCompraRepository.create(createListacompraDto);

      listaCompraRelations.compra = resCompraSucessGet;
      await this.listaCompraRepository.save(listaCompraRelations);

      return listaCompraRelations;
    }

    return {
      msg: 'error al listar las compras - listacompra - post',
    };

    return this.listaCompraRepository.save(createListacompraDto);
  }

  findAll() {
    return this.listaCompraRepository.find({
      relations: {
        compra: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.listaCompraRepository.find({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateListacompraDto: UpdateListacompraDto) {
    return this.listaCompraRepository.update(id, updateListacompraDto);
  }

  remove(id: number) {
    return this.listaCompraRepository.delete(id);
  }
}
