import { Module } from '@nestjs/common';
import { SmartphoneService } from './smartphone.service';
import { SmartphoneController } from './smartphone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Smartphone } from './entities/smartphone.entity';
// import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Smartphone]),
    // MulterModule.registerAsync({
    //   useFactory: () => ({
    //     dest: './client/img',
    //   }),
    // }),
  ],
  exports: [SmartphoneService],
  controllers: [SmartphoneController],
  providers: [SmartphoneService],
})
export class SmartphoneModule {}
