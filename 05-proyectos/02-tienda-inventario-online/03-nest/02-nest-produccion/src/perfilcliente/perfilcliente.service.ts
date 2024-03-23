import { Injectable } from '@nestjs/common';
import { CreatePerfilclienteDto } from './dto/create-perfilcliente.dto';
import { UpdatePerfilclienteDto } from './dto/update-perfilcliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfilcliente } from './entities/perfilcliente.entity';
import { Emailcliente } from 'src/emailcliente/entities/emailcliente.entity';
import { createReadStream } from 'fs';
import * as fs from 'fs';

@Injectable()
export class PerfilclienteService {
  constructor(
    @InjectRepository(Perfilcliente)
    private perfilClienteRepository: Repository<Perfilcliente>,
    @InjectRepository(Emailcliente)
    private emailClienteRepository: Repository<Emailcliente>,
  ) {}
  async create(createPerfilclienteDto: CreatePerfilclienteDto) {
    console.log(
      'dateando loas valores si pasan',
      createPerfilclienteDto.correoLoginCliente,
    );

    console.log('buffer del frontEnd', createPerfilclienteDto.dataimg);

    // return {
    //   msg: 'enviado del frontfotodata',
    // };

    //* validar si el correo y la session coinciden

    try {
      //* del correo tomas el id

      const emailClienteData = await this.emailClienteRepository.find({
        where: {
          emailcliente: createPerfilclienteDto.correoLoginCliente,
        },
        relations: {
          perfilcliente: true,
        },
      });

      if (emailClienteData.length > 0) {
        if (
          emailClienteData[0].sessioncliente ==
          createPerfilclienteDto.sessionCorreoLoginCliente
        ) {
          //* para agregar el perfilcliente al emailcliente ~ viceverza
          const emailCLienteRes = await this.emailClienteRepository.findOneBy({
            id: emailClienteData[0].id,
          });

          if (emailClienteData[0].perfilcliente == null) {
            //* guarda el perfilcliente y lo muestra en emailcliente

            const perfilCliente = await this.perfilClienteRepository.create(
              createPerfilclienteDto,
            );
            perfilCliente.emailcliente = emailCLienteRes;
            await this.perfilClienteRepository.save(perfilCliente);

            return {
              msg: 'registro el perfilcliente',
            };
          }

          //* actualiza el perfilcliente
          await this.perfilClienteRepository.update(
            emailClienteData[0].perfilcliente.id,
            {
              nombre: createPerfilclienteDto.nombre,
              apellido1: createPerfilclienteDto.apellido1,
              apellido2: createPerfilclienteDto.apellido2,
              direccion: createPerfilclienteDto.direccion,
              telefono: createPerfilclienteDto.telefono,
              genero: createPerfilclienteDto.genero,
              fecha: createPerfilclienteDto.fecha,
              // dataimg: createPerfilclienteDto.dataimg,
            },
          );

          console.log('eee', emailClienteData[0].perfilcliente.id);

          return {
            msg: 'actualizo el  perfilcliente',
          };
        } else {
          return {
            msg: 'no esta autorizado a registrar perfilcliente',
          };
        }
      }

      return {
        msg: 'no existe usuario en registro',
      };
    } catch (error) {
      console.log(error);

      return {
        msg: 'error al autozar el registro del perfilcliente',
      };
    }
  }

  async bufferData(emailcliente, file) {
    if (file) {
      return new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        const readStream = createReadStream(file.path);
        readStream.on('data', (chunk: any) => {
          chunks.push(chunk);
        });
        readStream.on('end', () => {
          const buffer = Buffer.concat(chunks);

          console.log('el buffer final-> ', buffer);

          console.log('data frontend', emailcliente);

          //*recuperamos el id del perfil conociendo su correo
          (async () => {
            const reqEmailBufferGet = await this.emailClienteRepository.find({
              where: { emailcliente: emailcliente },
              relations: {
                perfilcliente: true,
              },
            });

            console.log(
              'getclientBuffer - perfil',
              reqEmailBufferGet[0].perfilcliente.id,
            );
            const extBuffer = file.path.split('.').at(-1);

            //*actualizamos la foto del perfil cliente
            await this.perfilClienteRepository.update(
              reqEmailBufferGet[0].perfilcliente.id,
              {
                dataimg: buffer,
                ext: extBuffer,
              },
            );

            //*eliminamos el archivo local
            console.log('data del archivo', file);
            const nameFile = file.filename;
            await fs.unlinkSync(file.path);
            console.log(`archivo ${nameFile} eliminado`);
          })();

          //*guardamos el buffer en el perfilcliente

          resolve(buffer);
        });
        readStream.on('error', (error) => {
          reject(error);
        });
      });
    } else {
      return {
        msg: 'no selecciono imagen',
      };
    }
  }

  async imgBufferGo(email) {
    try {
      console.log('email - perfilcliente', email);

      //*obtenemos el id perfil con el correo

      const resIdPerfilGet = await this.emailClienteRepository.find({
        where: {
          emailcliente: email,
        },
        relations: {
          perfilcliente: true,
        },
      });

      const image: any = await this.perfilClienteRepository.find({
        where: {
          id: resIdPerfilGet[0].perfilcliente.id,
        },
      });

      console.log('info perfil', image);
      console.log('ext saliente-> ', image[0]?.ext);

      return {
        imgBuffer: image[0]?.dataimg,
        extBuffer: image[0]?.ext,
      };
    } catch (error) {
      console.log('buffer interno fix');
      return {
        msg: 'error buffer interno',
      };
    }
  }

  findAll() {
    return this.perfilClienteRepository.find({
      order: {
        id: 'DESC',
      },
      select: [
        'id',
        'nombre',
        'apellido1',
        'apellido2',
        'direccion',
        'telefono',
        'genero',
        'fecha',
        'ext',
      ],
      relations: { emailcliente: true },
    });
  }

  findOne(id: number) {
    return this.perfilClienteRepository.find({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updatePerfilclienteDto: UpdatePerfilclienteDto) {
    return this.perfilClienteRepository.update(id, updatePerfilclienteDto);
  }

  remove(id: number) {
    return this.perfilClienteRepository.delete(id);
  }
}
