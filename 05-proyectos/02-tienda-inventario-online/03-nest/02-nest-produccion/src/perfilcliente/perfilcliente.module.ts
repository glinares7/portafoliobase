import { Module } from '@nestjs/common';
import { PerfilclienteService } from './perfilcliente.service';
import { PerfilclienteController } from './perfilcliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfilcliente } from './entities/perfilcliente.entity';
import { Emailcliente } from 'src/emailcliente/entities/emailcliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perfilcliente, Emailcliente])],
  controllers: [PerfilclienteController],
  providers: [PerfilclienteService],
  exports: [TypeOrmModule],
})
export class PerfilclienteModule {}
