import { Controller, Get } from '@nestjs/common';
import { MealService } from './meal.service';

@Controller('cats/meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}
  @Get()
  getTh(): string {
    return this.mealService.getTomo();
  }
}
