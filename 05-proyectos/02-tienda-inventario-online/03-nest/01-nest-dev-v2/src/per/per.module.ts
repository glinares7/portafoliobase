import { Module } from '@nestjs/common';
import { PerService } from './per.service';
import { PerController } from './per.controller';

@Module({
  controllers: [PerController],
  providers: [PerService],
})
export class PerModule {}
