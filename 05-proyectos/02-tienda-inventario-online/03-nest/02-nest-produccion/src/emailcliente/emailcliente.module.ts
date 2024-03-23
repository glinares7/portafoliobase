import { Module } from '@nestjs/common';
import { EmailclienteService } from './emailcliente.service';
import { EmailclienteController } from './emailcliente.controller';
import { MailerModule } from '@nestjs-modules/mailer';

// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emailcliente } from './entities/emailcliente.entity';
// import { Perfilcliente } from '../perfilcliente/entities/perfilcliente.entity';
// import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Emailcliente]),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: Number(587),
        tls: {
          ciphers: 'SSLv3',
        },
        secure: false,
        auth: {
          user:
            `${process.env.EMAIL_NAME}` != 'undefined'
              ? `${process.env.EMAIL_NAME}`
              : 'mail@gmail.com',
          pass:
            `${process.env.EMAIL_PASSWORD}` != 'undefined'
              ? `${process.env.EMAIL_PASSWORD}`
              : 'topsecret',
        },
      },
      defaults: {
        from: '"Team reply" <glinarese1@gmail.com>',
      },
      template: {
        // dir: join(process.cwd(), '/emailcliente/templates'),
        dir: './src/emailcliente/templates',
        // adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
  ],
  controllers: [EmailclienteController],
  providers: [EmailclienteService],
  exports: [TypeOrmModule],
})
export class EmailclienteModule {}
