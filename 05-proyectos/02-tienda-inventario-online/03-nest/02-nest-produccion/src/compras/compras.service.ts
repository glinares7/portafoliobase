import { Injectable } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { Repository } from 'typeorm';
import { Emailcliente } from 'src/emailcliente/entities/emailcliente.entity';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra)
    private compraRepository: Repository<Compra>,
    @InjectRepository(Emailcliente)
    private emailClienteRepository: Repository<Emailcliente>,
  ) {}
  create(createCompraDto: CreateCompraDto) {
    try {
      //*generamos una  sesion de 8 digitos

      const min = Math.ceil(10000000);
      const max = Math.floor(99999999);
      const resultMathRandom = Math.floor(
        Math.random() * (max - min + 1) + min,
      );

      console.log('numero de 8 digitos', resultMathRandom);

      createCompraDto.sessioncompra = resultMathRandom;
      return this.compraRepository.save(createCompraDto);
    } catch (error) {
      console.log('error-compras ', error.name);

      if (error.name === 'QueryFailedError') {
        return {
          msg: 'error en la llave foranea - compras',
        };
      }
      return {
        msg: 'error en el servidor - compras',
      };
    }
  }

  async buyCompraCliente(createCompraDto: CreateCompraDto) {
    try {
      //*^traemos  la tabla compra para agregar al usuario

      const reqCompraGetValidte = await this.compraRepository.find({
        where: {
          sessioncompra: createCompraDto.sessioncompra,
        },
        order: {
          id: 'DESC',
          listacompra: {
            id: 'DESC',
          },
        },
        relations: {
          listacompra: true,
        },
      });

      console.log('en el servidor ', reqCompraGetValidte);

      //* validamos la sesion y el correo para taer el id del emailcliente - if

      const reqEmailClienteValidateFind =
        await this.emailClienteRepository.findOneBy({
          sessioncliente: createCompraDto.sessionclientebase,
        });

      //* creamos el contenedor de compras y añadimos el id del emailcliente para que actualize

      const compraContent = await this.compraRepository.create(
        reqCompraGetValidte[0],
      );

      compraContent.emailcliente = reqEmailClienteValidateFind;

      await this.compraRepository.save(compraContent);

      return compraContent;
    } catch (error) {
      console.log('error name-> ', error.name);
      return {
        msg: 'no se puede guardar el valor en el servidor - error compras',
      };
    }
  }

  findAll() {
    return this.compraRepository.find({
      relations: {
        listacompra: true,
        emailcliente: true,
      },
      order: {
        id: 'DESC',
        listacompra: {
          id: 'DESC',
        },
      },
    });
  }

  findOne(id: number) {
    return this.compraRepository.find({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateCompraDto: UpdateCompraDto) {
    return this.compraRepository.update(id, updateCompraDto);
  }

  remove(id: number) {
    return this.compraRepository.delete(id);
  }
}
