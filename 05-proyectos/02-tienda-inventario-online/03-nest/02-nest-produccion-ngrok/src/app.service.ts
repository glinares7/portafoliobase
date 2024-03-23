import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return 'Pagina de aterrizaje proyecto nextjs / nestjs';
  }
  getPing(res) {
    return res.status(200).json({ message: 'Ping exitoso desde NestJS' });
  }
}
