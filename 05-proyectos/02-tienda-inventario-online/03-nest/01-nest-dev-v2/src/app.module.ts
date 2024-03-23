import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { PerModule } from './per/per.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { Photo } from './photo/entities/photo.entity';
import { PhotoModule } from './photo/photo.module';
// import { PhotoModule } from './photo/photo.module';
import { ClienteModule } from './cliente/cliente.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { User } from './users/entities/user.entity';
import { Dni } from './cliente/dni/entities/dni.entity';
import { Banco } from './cliente/banco/entities/banco.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestCli',
      entities: [User, Photo, Cliente, Dni, Banco],
      synchronize: true,
    }),
    CatsModule,
    PerModule,
    UsersModule,
    PhotoModule,
    ClienteModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
