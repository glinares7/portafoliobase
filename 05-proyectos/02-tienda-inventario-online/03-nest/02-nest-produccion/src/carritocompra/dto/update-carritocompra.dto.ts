import { PartialType } from '@nestjs/mapped-types';
import { CreateCarritocompraDto } from './create-carritocompra.dto';

export class UpdateCarritocompraDto extends PartialType(
  CreateCarritocompraDto,
) {}
