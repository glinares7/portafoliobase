import { Module } from '@nestjs/common';
import { BancoService } from './banco.service';
import { BancoController } from './banco.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banco } from './entities/banco.entity';
import { Dni } from '../dni/entities/dni.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Banco, Dni])],
  controllers: [BancoController],
  providers: [BancoService],
})
export class BancoModule {}
