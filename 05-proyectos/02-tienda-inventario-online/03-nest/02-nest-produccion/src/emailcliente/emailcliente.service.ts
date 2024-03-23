import { Injectable } from '@nestjs/common';
import { CreateEmailclienteDto } from './dto/create-emailcliente.dto';
import { UpdateEmailclienteDto } from './dto/update-emailcliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Emailcliente } from './entities/emailcliente.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class EmailclienteService {
  constructor(
    @InjectRepository(Emailcliente)
    private emailClienteRepository: Repository<Emailcliente>,
    private mailerService: MailerService,
  ) {}

  async sendVerify(createEmailclienteDto: CreateEmailclienteDto, request) {
    //*ênviamos el correo a su bandeja
    console.log('email desde afuera', createEmailclienteDto.emailcliente);

    console.log(
      'ruta relativa arr',
      join(process.cwd(), '../emailcliente/templates'),
    );
    console.log('llevado desde el servidor !!', process.env.EMAIL_NAME);

    //*agregamos los requerimientos de envio

    // const subject = `Welcome to Company: prueba`;

    //*agregamos codigo de verificación (6 digitos)

    const min = Math.ceil(100000);
    const max = Math.floor(999999);
    const resultMathRandom = Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive

    console.log('numero de 6 digitos', resultMathRandom);

    //*modo prueba
    // request.session.sessionemailclient = resultMathRandom;

    // return { msg: 'mensaje enviado' };

    //*fin modo prueba

    //*âgregar sesion al servidor (validar la condicion si llego el mensaje al cliente)
    request.session.sessionemailclient = resultMathRandom;

    console.log('session agregada emailclient validate -> ', request.session);

    //*inicio

    try {
      console.log('comparativa de la sesion local y la sesion del servidor ');

      // const iv = randomBytes(16);

      // console.log('random-bytes', iv);

      // const bufferIv = iv.toString('base64');

      // const password = 'cLav3s3cr3t4d3num3r0s';

      // const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
      // const cipher = createCipheriv('aes-256-ctr', key, iv);

      // const textToEncrypt = 'NestdelavidaaTodo';
      // const encryptedText = Buffer.concat([
      //   cipher.update(textToEncrypt),
      //   cipher.final(),
      // ]);

      // //*ênviamos al servidor el fuffer como texto
      // const passString = encryptedText.toString('base64');
      // console.log('texto encriptado-buffer', encryptedText);
      // console.log('texto encriptado', encryptedText.toString('base64'));

      // createEmailclienteDto.passcliente = passString;
      // createEmailclienteDto.bufferiv = bufferIv;
      createEmailclienteDto.sessioncliente = resultMathRandom;
      await this.emailClienteRepository.save(createEmailclienteDto);

      //* enviamos el correo
      try {
        const reqSessionClienteSend = await this.mailerService.sendMail({
          to: createEmailclienteDto.emailcliente,
          subject: `Ventana de verificación para su registro.`,
          template: 'welcome',
          context: {
            name: createEmailclienteDto.emailcliente,
            numrandom: resultMathRandom,
          },
        });

        console.log('framework -> ', reqSessionClienteSend);

        if (reqSessionClienteSend.response.includes('OK')) {
          //*creamos el cliente user
          return { msg: 'mensaje enviado' };
        }
      } catch (error) {
        if (error.responseCode === 535) {
          return {
            msg: 'el servidor no puede enviar mensaje',
          };
        }
      }
    } catch (error) {
      if (error.name === 'QueryFailedError') {
        return {
          msg: 'cliente existente - valide nuevamente el correo',
        };
      } else {
        return {
          msg: 'error inesperado del servidor',
        };
      }
    }

    //*fin

    //*crea la interfaz para validar el codigo de verificación ~ hecho
    //*agregar la credential al fetch del cliente para que acepte la sesion

    //*en el servidor crea una  nueva ruta para el registro del cliente -> tener en cuenta id,correo,pass,createAt,updateAt,envio(carritocompra)(pendiente,despachado,entregado,cancelado),estado,A->N(pedidocliente) , por defecto el pass es vacio

    //* no olvidar agregar envio dentro del carrito compra ***

    // await this.mailerService.sendMail({
    //   to: createEmailclienteDto.emailcliente,
    //   // from: '"Support Team" <support@example.com>', // override default from
    //   subject: 'Bienvenido to Nice App! Confirm your Email',
    //   template: './confirmation', // `.hbs` extension is appended automatically
    //   context: {
    //     name: createEmailclienteDto.emailcliente,
    //     url,
    //   },
    // });
  }

  async create(createEmailclienteDto: CreateEmailclienteDto, request) {
    console.log('llego o no al servidor', createEmailclienteDto.emailcliente);

    console.log('capturamos la sesion ???', request.session);

    console.log(
      'muestrame la sessionlocal',
      createEmailclienteDto.sessioncliente,
    );

    //* accedemos al usuario por su correo
    const getClientCorreo = await this.emailClienteRepository.find({
      where: {
        emailcliente: createEmailclienteDto.emailcliente,
      },
    });

    try {
      console.log(
        'damle el dato del del server',
        getClientCorreo[0].sessioncliente,
      );

      //* comparamos la session del correo con la de la bd

      if (
        createEmailclienteDto.sessioncliente ==
        getClientCorreo[0].sessioncliente
      ) {
        console.log('los valores coinciden');
        //*actualizamos su estado a 1

        createEmailclienteDto.estado = 1;
        await this.emailClienteRepository.update(getClientCorreo[0].id, {
          estado: createEmailclienteDto.estado,
        });
        return {
          msg: 'sesion valida uyt',
        };
      } else {
        console.log('los valores no coinciden intente otra vez ');

        if (getClientCorreo[0].id) {
          await this.emailClienteRepository.delete(getClientCorreo[0].id);
        }

        return {
          msg: 'sesion invalida -vuelva a registrar',
        };
      }
    } catch (error) {
      return {
        msg: 'sesion no accesible, vuelva a registrar',
      };
    }
    //* conparamos la condicion de la sesion para poder regisrtrar

    // if (
    //   createEmailclienteDto.sessioncliente == request.session.sessionemailclient
    // ) {
    //   try {
    //     console.log('comparativa de la sesion local y la sesion del servidor ');
    //     return await this.emailClienteRepository.save(createEmailclienteDto);
    //   } catch (error) {
    //     if (error.name === 'QueryFailedError') {
    //       return {
    //         msg: 'cliente existente - vuelva a registrar',
    //       };
    //     } else {
    //       return {
    //         msg: 'error inesperado del servidor',
    //       };
    //     }
    //   }
    // } else {
    //   return {
    //     msg: 'sesion invalida -vuelva a registrar',
    //   };
    // }
  }

  async sendCorreo(createEmailclienteDto: CreateEmailclienteDto, request) {
    console.log(
      'email desde afuera correoVerify',
      createEmailclienteDto.emailcliente,
    );

    //*agregamos codigo de verificación (6 digitos)

    const min = Math.ceil(100000);
    const max = Math.floor(999999);
    const resultMathRandomCorreo = Math.floor(
      Math.random() * (max - min + 1) + min,
    ); // The maximum is inclusive

    console.log('numero de 6 digitos correoVerify', resultMathRandomCorreo);

    //*modo prueba
    // request.session.sessioncorreo = resultMathRandomCorreo;
    // return { msg: 'mensaje enviado' };
    console.log('session agregada emailclientCorreo -> ', request);
    try {
      //* del correo extraemos el id
      const getCorreoCLientRes = await this.emailClienteRepository.find({
        where: {
          emailcliente: createEmailclienteDto.emailcliente,
        },
      });

      console.log('id del usuario login', getCorreoCLientRes[0].id);

      //*validamos si el usuario esta verificado

      if (getCorreoCLientRes[0].estado == 0) {
        await this.emailClienteRepository.delete(getCorreoCLientRes[0].id);

        return {
          msg: 'usuario no verificado , vuelva a registrar',
        };
      }

      createEmailclienteDto.sessioncliente = resultMathRandomCorreo;
      await this.emailClienteRepository.update(getCorreoCLientRes[0].id, {
        sessioncliente: createEmailclienteDto.sessioncliente,
      });

      try {
        const reqSessionClienteSend = await this.mailerService.sendMail({
          to: createEmailclienteDto.emailcliente,
          subject: `Ventana de verificación para el login.`,
          template: 'logincorreo',
          context: {
            nameCorreo: createEmailclienteDto.emailcliente,
            numrandomCorreo: resultMathRandomCorreo,
          },
        });

        console.log('framework -> ', reqSessionClienteSend);

        //*âgregar sesion al servidor (validar la condicion si llego el mensaje al cliente)
        request.sessioncorreo = resultMathRandomCorreo;
        request.save();
        console.log('session agregada emailclientCorreo -> ', request);

        if (reqSessionClienteSend.response.includes('OK')) {
          return { msg: 'mensaje enviado' };
        }
      } catch (error) {
        if (error.responseCode === 535) {
          return {
            msg: 'el servidor no puede enviar mensaje',
          };
        }
      }
    } catch (error) {
      console.log('name', error.name);

      console.log('usuario no existe en la bd , no puede logear');
      return {
        msg: 'usuario no existe en la bd , no puede logear',
      };
    }

    //*inicio
    // try {
    //   const reqSessionClienteSend = await this.mailerService.sendMail({
    //     to: createEmailclienteDto.emailcliente,
    //     subject: `Ventana de verificación para el login.`,
    //     template: 'logincorreo',
    //     context: {
    //       nameCorreo: createEmailclienteDto.emailcliente,
    //       numrandomCorreo: resultMathRandomCorreo,
    //     },
    //   });

    //   console.log('framework -> ', reqSessionClienteSend);

    //   //*âgregar sesion al servidor (validar la condicion si llego el mensaje al cliente)
    //   request.sessioncorreo = { sesionauth: resultMathRandomCorreo };
    //   request.save();
    //   console.log('session agregada emailclientCorreo -> ', request);

    //   if (reqSessionClienteSend.response.includes('OK')) {
    //     return { msg: 'mensaje enviado' };
    //   }
    // } catch (error) {
    //   if (error.responseCode === 535) {
    //     return {
    //       msg: 'el servidor no puede enviar mensaje',
    //     };
    //   }
    // }

    //*fin
  }

  async loginCorreo(createEmailclienteDto: CreateEmailclienteDto, request) {
    console.log(
      'llego o no al servidor loginCorreo',
      createEmailclienteDto.emailcliente,
    );

    console.log('capturamos la sesion login-correo ???', request);

    console.log(
      'capturamos la sesion del input local',
      createEmailclienteDto.sessioncliente,
    );

    //* extraemos la sesion usando el correo
    try {
      const resCorreoLoginValidateFind = await this.emailClienteRepository.find(
        {
          where: {
            emailcliente: createEmailclienteDto.emailcliente,
          },
        },
      );

      // console.log(resCorreoLoginValidateFind[0]);

      //*validar si el correo existe
      if (resCorreoLoginValidateFind.length == 0) {
        return {
          msg: 'el usuario no esta registrado - logincliente',
        };
      }

      //*validar si la sesion coincide

      if (
        resCorreoLoginValidateFind[0].sessioncliente ==
        createEmailclienteDto.sessioncliente
      ) {
        return {
          sesioncorreologincliente:
            resCorreoLoginValidateFind[0].sessioncliente,
          correologincliente: createEmailclienteDto.emailcliente,
        };
      } else {
        return {
          msg: 'la sesion no coincide - vuelve a ingresar',
        };
      }
    } catch (error) {
      console.log('error del servidor logincorreovalidate -> ', error.name);
    }
  }

  async passRegisterConfirm(
    createEmailclienteDto: CreateEmailclienteDto,
    request,
  ) {
    console.log('correo-pass-verify', createEmailclienteDto.emailcliente);

    console.log(
      'contrasena verify-confirm',
      createEmailclienteDto.passcliente.length,
    );

    console.log('session verify-confirmation', request.session);

    try {
      const reqClientRegisterGet = await this.emailClienteRepository.find({
        where: {
          emailcliente: createEmailclienteDto.emailcliente,
        },
      });

      //* validamos que sean de 5 cifras

      try {
        if (createEmailclienteDto.passcliente.length >= 5) {
          //* agregamos la contraseña al usuario

          //* encriptamos la contraseña

          const iv = randomBytes(16);

          console.log('random-bytes', iv);

          const bufferIv = iv.toString('base64');

          const password = process.env.BUFFER_IV || 'cLav3s3cr3t4d3num3r0s';

          const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
          const cipher = createCipheriv('aes-256-ctr', key, iv);

          //*agregamos el pass-cliente
          const textToEncrypt = createEmailclienteDto.passcliente;
          const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
          ]);

          //*ênviamos al servidor el buffer como texto
          console.log('texto encriptado', encryptedText.toString('base64'));
          const passString = encryptedText.toString('base64');

          createEmailclienteDto.passcliente = passString;
          createEmailclienteDto.bufferiv = bufferIv;

          await this.emailClienteRepository.update(reqClientRegisterGet[0].id, {
            passcliente: createEmailclienteDto.passcliente,
            bufferiv: createEmailclienteDto.bufferiv,
          });

          return {
            msg: 'actualizo la contraseña - registercliente',
          };
        }
        return { msg: 'la contraseña debe ser mayor a  5 cifras' };
      } catch (error) {
        console.log(error.name);

        return {
          msg: 'error del servidor - update password cliente',
        };
      }
    } catch (error) {
      console.log('error ->', error.name);

      return {
        msg: 'error al buscar el cliente',
      };
    }
  }

  async emailclienteLogin(
    createEmailclienteDto: CreateEmailclienteDto,
    request,
  ) {
    console.log('correo del login', createEmailclienteDto.emailcliente);

    console.log('contrasela del login', createEmailclienteDto.passcliente);

    console.log('session del cliente', request.session);

    //*validamos que que el estado sea 1
    //* accedemos a su información porcorreo

    const resEmailPassClientGet = await this.emailClienteRepository.find({
      where: {
        emailcliente: createEmailclienteDto.emailcliente,
      },
    });

    if (resEmailPassClientGet.length == 0) {
      return {
        msg: 'el usuario no esta registrado - logincliente',
      };
    }

    try {
      if (resEmailPassClientGet[0].estado === 1) {
        //* usuario validado no tiene contraseña

        if (
          resEmailPassClientGet[0].passcliente === '' &&
          resEmailPassClientGet[0].bufferiv === ''
        ) {
          return {
            msg: 'no asigno contraseña - ingrese por correo',
          };
        }

        //*desencryptamos el paass

        try {
          //* valores previos como iv, key

          //* key

          const password = process.env.BUFFER_IV || 'cLav3s3cr3t4d3num3r0s';

          const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;

          //*îv

          //* convertimos de base64 a buffer para que sea tratado como archivo

          const bufferPassClient = Buffer.from(
            resEmailPassClientGet[0].passcliente,
            'base64',
          );

          const bufferIvPassKey = Buffer.from(
            resEmailPassClientGet[0].bufferiv,
            'base64',
          );

          //* desencriptar

          const decipher = createDecipheriv(
            'aes-256-ctr',
            key,
            bufferIvPassKey,
          );
          const decryptedText = Buffer.concat([
            decipher.update(bufferPassClient),
            decipher.final(),
          ]);

          console.log(
            'texto a desencryptar-buffer -email client',
            decryptedText,
          );
          console.log(
            'texto a desencryptar -get emailclient',
            decryptedText.toString('utf-8'),
          );

          const descryptPass = decryptedText.toString('utf-8');

          //*fin
          //* validamos que el uauario y la contraseña coincidan

          if (
            resEmailPassClientGet[0].emailcliente ===
              createEmailclienteDto.emailcliente &&
            descryptPass === createEmailclienteDto.passcliente
          ) {
            //* actualizamos la session del cliente

            //*agregamos la nueva sesion  (6 digitos)

            const min = Math.ceil(100000);
            const max = Math.floor(999999);
            const resultMathRandomEmailPass = Math.floor(
              Math.random() * (max - min + 1) + min,
            ); // The maximum is inclusive

            console.log(
              'numero de 6 digitos correoVerify -updatecliente',
              resultMathRandomEmailPass,
            );

            await this.emailClienteRepository.update(
              resEmailPassClientGet[0].id,
              {
                sessioncliente: resultMathRandomEmailPass,
              },
            );

            //* mostrar los cambios añadidos

            const resEmailPassNewGet = await this.emailClienteRepository.find({
              where: {
                emailcliente: createEmailclienteDto.emailcliente,
              },
            });
            return {
              correocliente: resEmailPassNewGet[0].emailcliente,
              sessioncliente: resEmailPassNewGet[0].sessioncliente,
            };
          } else {
            return {
              msg: 'usuario y/o contraseña invalidos - emailpasscliente',
            };
          }
        } catch (error) {
          console.log(error.name);

          return {
            msg: 'error en las credenciales -loginCliente',
          };
        }
      }

      if (resEmailPassClientGet[0].estado === 0) {
        await this.emailClienteRepository.delete(resEmailPassClientGet[0].id);

        return {
          msg: 'usuario no autorizado , vuelva a registrar',
        };
      }
    } catch (error) {
      console.log('errror ->', error.name);
      return {
        msg: 'error autorizacion - loginCliente',
      };
    }
  }

  async findAll(request) {
    console.log('respuesta session cliente', request.session);

    return await this.emailClienteRepository.find({
      order: {
        id: 'DESC',
        compra: {
          id: 'DESC',
          listacompra: {
            id: 'DESC',
          },
        },
      },
      select: {
        id: true,
        emailcliente: true,
        passcliente: true,
        estado: true,
        sessioncliente: true,
        createAt: true,
        updatedAt: true,
        perfilcliente: {
          id: true,
          nombre: true,
          apellido1: true,
          apellido2: true,
          direccion: true,
          telefono: true,
          genero: true,
          fecha: true,
          ext: true,
        },
      },
      relations: {
        perfilcliente: true,
        compra: {
          listacompra: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.emailClienteRepository.find({
      where: {
        id: id,
      },
    });
  }

  async findEmailOne(sesioncorreo: string) {
    try {
      const resGetClienteFindCorreo = await this.emailClienteRepository.find({
        where: {
          emailcliente: sesioncorreo,
        },
        relations: {
          perfilcliente: true,
        },
      });

      if (resGetClienteFindCorreo.length == 0) {
        return {
          msg: 'error al buscar por correo en el servidor',
        };
      }

      return resGetClienteFindCorreo;
    } catch (error) {
      console.log('error-emailclienteData- findEmailOne', error.name);
      return {
        msg: 'demora al envio de data(servidor) - findEmailOne - emailcliente',
      };
    }
  }

  update(id: number, updateEmailclienteDto: UpdateEmailclienteDto) {
    return {
      msg: `This action updates a #${id} emailcliente ${updateEmailclienteDto.emailcliente}`,
    };
  }

  remove(id: number) {
    return this.emailClienteRepository.delete(id);
  }
}
