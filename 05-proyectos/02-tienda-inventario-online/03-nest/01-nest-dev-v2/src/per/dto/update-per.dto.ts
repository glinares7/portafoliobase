import { PartialType } from '@nestjs/mapped-types';
import { CreatePerDto } from './create-per.dto';

export class UpdatePerDto extends PartialType(CreatePerDto) {
  age: number;
}
