import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Pagina de aterrizaje proyecto nextjs / nestjs';
  }
}
