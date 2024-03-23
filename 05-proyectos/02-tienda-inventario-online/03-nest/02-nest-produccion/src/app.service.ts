import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return 'Pagina de aterrizaje proyecto nextjs / nestjs';
  }
  getPing() {
    return { message: 'Ping exitoso desde NestJS' };
  }
}
