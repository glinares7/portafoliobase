import { Injectable } from '@nestjs/common';
import { CreateCarritocompraDto } from './dto/create-carritocompra.dto';
import { UpdateCarritocompraDto } from './dto/update-carritocompra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carritocompra } from './entities/carritocompra.entity';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CarritocompraService {
  constructor(
    @InjectRepository(Carritocompra)
    private carritoCompraRepository: Repository<Carritocompra>,
  ) {}
  create(createCarritocompraDto: CreateCarritocompraDto, request) {
    console.log('metodo post');

    const sesionCarritoCompra = uuidv4();

    createCarritocompraDto.sessioncarrito = sesionCarritoCompra;

    request.session.sesioncarritocompra = sesionCarritoCompra;
    console.log('session carrito', request.session.sesioncarritocompra);

    return this.carritoCompraRepository.save(createCarritocompraDto);
  }

  // async buyCompra(createCarritocompraDto: CreateCarritocompraDto) {
  //   try {
  //     console.log(
  //       'session de la carrito  -> ',
  //       createCarritocompraDto.sessioncarrito,
  //     );
  //     console.log(
  //       'session de la compra  -> ',
  //       createCarritocompraDto.sessioncompra,
  //     );

  //     //* extraemos el id de la session de la compra

  //     // const resCompraFind = await this.compraRepository.find({
  //     //   where: {
  //     //     sessioncompra: createCarritocompraDto.sessioncompra,
  //     //   },
  //     // });

  //     const resCompraFindOne = await this.compraRepository.findOneBy({
  //       sessioncompra: createCarritocompraDto.sessioncompra,
  //     });

  //     console.log('resCompraFind', resCompraFindOne);

  //     const carritoCompraK = await this.carritoCompraRepository.find({
  //       where: {
  //         sessioncarrito: createCarritocompraDto.sessioncarrito,
  //       },
  //       relations: {
  //         pedidos: true,
  //         compras: true,
  //       },
  //     });

  //     console.log('dame el valor io', carritoCompraK);

  //     return {
  //       msg: 'dame la fortaleza',
  //     };

  //     // if (resCompraFindOne) {
  //     //   console.log('si existe la compra ');

  //     //   //* llamamos a la instancia de carrito

  //     //   // const carritoCompraS = await this.carritoCompraRepository.find({
  //     //   //   where: {
  //     //   //     sessioncarrito: createCarritocompraDto.sessioncarrito,
  //     //   //   },
  //     //   // });

  //     //   // const carritoCompra =
  //     //   //   await this.carritoCompraRepository.create(carritoCompraK);

  //     //   carritoCompraK[0].compras = resCompraFindOne;
  //     //   //* se actualizar o se agresi un nuevo carrito

  //     //   await this.carritoCompraRepository.save(carritoCompraK[0]);
  //     //   return carritoCompraK;
  //     // }

  //     return {
  //       msg: 'enviado exitoso para la compra de productos',
  //     };
  //   } catch (error) {
  //     console.log('error name', error);
  //     return {
  //       msg: 'error inesperado  al actualizar',
  //     };
  //   }
  // }

  findAll() {
    console.log('metodo get');

    return this.carritoCompraRepository.find({
      relations: {
        pedidos: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    console.log('metodo getOne');

    try {
      const getOneCarrito = await this.carritoCompraRepository.find({
        where: { id: id },
        relations: {
          pedidos: true,
        },
      });
      if (getOneCarrito[0].pedidos) {
        return getOneCarrito[0];
      }
    } catch (error) {
      if (error) {
        if (error.name === 'TypeError') {
          return {
            msg: 'carrito-compra  no encontrada',
          };
        }
      }
    }
  }
  async findOneSession(session: string) {
    console.log('metodo getOneSession');

    try {
      const result: any = await this.carritoCompraRepository.find({
        where: { sessioncarrito: session },
        relations: {
          pedidos: true,
        },
      });

      if (result[0].sessioncarrito) {
        return result[0];
      }
    } catch (error) {
      if (error) {
        if (error.name === 'TypeError') {
          return {
            msg: 'sesion no encontrada',
          };
        }
      }
    }
  }

  update(id: number, updateCarritocompraDto: UpdateCarritocompraDto) {
    console.log('metodo update');
    return this.carritoCompraRepository.update(id, updateCarritocompraDto);
  }

  remove(id: number) {
    console.log('metodo delete');
    return this.carritoCompraRepository.delete(id);
  }
}
