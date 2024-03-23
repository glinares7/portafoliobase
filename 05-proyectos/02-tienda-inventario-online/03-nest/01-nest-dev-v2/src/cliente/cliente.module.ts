import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { DniModule } from './dni/dni.module';
import { Dni } from './dni/entities/dni.entity';
import { BancoModule } from './banco/banco.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Dni]), DniModule, BancoModule],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
