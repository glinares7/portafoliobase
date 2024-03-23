import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class MealService {
  @Get()
  getTomo(): string {
    return 'join us a bite';
  }
}
