import { PartialType } from '@nestjs/mapped-types';
import { CreateSmartphoneDto } from './create-smartphone.dto';

export class UpdateSmartphoneDto extends PartialType(CreateSmartphoneDto) {}
