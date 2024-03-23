import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World actualizar esto sin hacer click en este comando ';
  }
}
