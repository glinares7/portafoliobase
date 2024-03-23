import { Module } from '@nestjs/common';
import { SesionService } from './sesion.service';
import { SesionController } from './sesion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sesion } from './entities/sesion.entity';
// import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sesion]), UsersModule],
  controllers: [SesionController],
  providers: [SesionService],
})
export class SesionModule {}
