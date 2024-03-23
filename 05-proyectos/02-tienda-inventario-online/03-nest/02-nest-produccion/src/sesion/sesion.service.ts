import { Injectable } from '@nestjs/common';
import { CreateSesionDto } from './dto/create-sesion.dto';
import { UpdateSesionDto } from './dto/update-sesion.dto';
import { Sesion } from './entities/sesion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
// import { UsersService } from 'src/users/users.service'

import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class SesionService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Sesion)
    private sesionRepository: Repository<Sesion>,
  ) {}

  async create(id: number, createSesionDto: CreateSesionDto, request) {
    createSesionDto.idUser = id;
    createSesionDto.session = uuidv4();

    const resUser: any = await this.usersService.encryptOne(id);

    console.log(resUser);
    // response.cookie('session', uuidv4());

    //*sesion se almacena en el servidor
    request.session.sesion = createSesionDto.session;
    console.log('session del sevidor inicial', request.session.sesion);

    // await request.session.save();
    // console.log('dataSession', request.sessionID);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = createSesionDto;

    // console.log('sesionGet', request.session);

    // return this.sesionRepository.save(result);
    // return request.session;
    return result;
  }

  findAll(sesion, request) {
    //* si se logea validar la sesion del servidor === con la sesion del cliente y si coinciden mostrar la información

    //* si se cayo el servidor validar la sesion cliente  === sesion(bd)

    // console.log('sesionCLientGet --->', request.headers.authorization);
    console.log('sesionCLientGet --->', sesion);
    console.log('sesionServerGet --->', request.session.sesion);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cookie, ...resto } = request.session;

    console.log('resto', resto);

    if (!request.session.sesion) {
      console.log('no ha iniciado sesion');

      return {
        msg: 'no tiene sesion - server down',
      };
    }

    if (request.session.sesion) {
      if (sesion === request.session.sesion) {
        console.log('tiene sesion');

        return this.sesionRepository.find({
          order: {
            id: 'DESC',
          },
        });
        // return resto;
      }
      console.log('sesion no valida');

      return {
        msg: 'sesion no valida',
      };
    }

    // if (!request.headers.authorization) {

    // }
  }

  findAllDestroy(sesion, request) {
    //* si se logea validar la sesion del servidor === con la sesion del cliente y si coinciden mostrar la información

    //* si se cayo el servidor validar la sesion cliente  === sesion(bd)

    // console.log('sesionCLientGet --->', request.headers.authorization);
    console.log('sesionCLientGetDestroy --->', sesion);
    console.log('sesionServerGetDestroy --->', request.session.sesion);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    if (request.session.sesion) {
      request.session.destroy();
      console.log('sesion logout destroy');

      return {
        msg: 'sesion finalizada',
      };
    } else {
      return {
        msg: 'sesion caducada',
      };
    }

    // if (!request.headers.authorization) {

    // }
  }

  findOne(id: number) {
    return this.sesionRepository.find({ where: { id: id } });
  }

  update(id: number, updateSesionDto: UpdateSesionDto) {
    return this.sesionRepository.update(id, updateSesionDto);
  }

  remove(id: number) {
    return this.sesionRepository.delete(id);
  }
}
