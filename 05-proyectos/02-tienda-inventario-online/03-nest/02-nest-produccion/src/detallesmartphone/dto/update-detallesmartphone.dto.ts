import { PartialType } from '@nestjs/mapped-types';
import { CreateDetallesmartphoneDto } from './create-detallesmartphone.dto';

export class UpdateDetallesmartphoneDto extends PartialType(
  CreateDetallesmartphoneDto,
) {}
