import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmartphoneModule } from './smartphone/smartphone.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Smartphone } from './smartphone/entities/smartphone.entity';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { PerfilModule } from './perfil/perfil.module';
import { Perfil } from './perfil/entities/perfil.entity';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';
import { LoggerMiddleware } from './common/midleware/logger.midleware';
import { SesionModule } from './sesion/sesion.module';
import { Sesion } from './sesion/entities/sesion.entity';
import { DetallesmartphoneModule } from './detallesmartphone/detallesmartphone.module';

// import * as session from 'express-session';
import { Detallesmartphone } from './detallesmartphone/entities/detallesmartphone.entity';
import { CarritocompraModule } from './carritocompra/carritocompra.module';
import { Carritocompra } from './carritocompra/entities/carritocompra.entity';
import { PedidosModule } from './pedidos/pedidos.module';
import { Pedido } from './pedidos/entities/pedido.entity';
// import { jwtConstants } from './auth/constansts';
import { ListacompraModule } from './listacompra/listacompra.module';
import { ComprasModule } from './compras/compras.module';
import { PerfilclienteModule } from './perfilcliente/perfilcliente.module';

import { EmailclienteModule } from './emailcliente/emailcliente.module';
import { Emailcliente } from './emailcliente/entities/emailcliente.entity';
import { Perfilcliente } from './perfilcliente/entities/perfilcliente.entity';
import { Compra } from './compras/entities/compra.entity';
import { Listacompra } from './listacompra/entities/listacompra.entity';
// import * as session from 'express-session';
// import { jwtConstants } from './auth/constansts';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../'),
      renderPath: '/public',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.POSTGRES_HOST || 'localhost',
      // port: parseInt(process.env.POSTGRES_PORT || '5432'),
      // username: process.env.POSTGRES_USER || 'devgtp',
      // password: process.env.POSTGRES_PASSWORD || 'family',
      // database: process.env.POSTGRES_DB || 'nestbuild',
      url:
        process.env.POSTGRES_URL ||
        'postgres://devgtp:family@localhost:5432/nestbuild',
      entities: [
        Smartphone,
        User,
        Perfil,
        Auth,
        Sesion,
        Detallesmartphone,
        Carritocompra,
        Pedido,
        Emailcliente,
        Perfilcliente,
        Compra,
        Listacompra,
      ],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    SmartphoneModule,
    UsersModule,
    PerfilModule,
    AuthModule,
    SesionModule,
    DetallesmartphoneModule,
    CarritocompraModule,
    PedidosModule,
    EmailclienteModule,
    PerfilclienteModule,
    ComprasModule,
    ListacompraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'auth/login/all/*', method: RequestMethod.GET });
    // consumer.apply(session({ secret: jwtConstants.secret })).forRoutes('*');
  }
}
