import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class CatsService {
  findAll(query): string {
    return `Todo es mejor.. desde ${query.skip} hasta  ${query.limit}.`;
  }

  postExample(valor): string {
    return `Por method POST ${valor}`;
  }

  nuevaR(valor, response): string {
    // return `el valor de ${nombre}`;
    if (typeof valor.nombre === 'number') {
      const dat = {
        result: `Debe ser un string ~ err ${valor.nombre}`,
      };

      return response.status(HttpStatus.NOT_ACCEPTABLE).json(dat);
    }

    const loge = { result: valor.nombre };
    return response.status(HttpStatus.OK).json(loge);
  }
}
