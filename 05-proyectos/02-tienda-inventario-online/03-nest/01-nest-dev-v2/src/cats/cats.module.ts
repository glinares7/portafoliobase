import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MealModule } from './meal/meal.module';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [MealModule],
})
export class CatsModule {}
