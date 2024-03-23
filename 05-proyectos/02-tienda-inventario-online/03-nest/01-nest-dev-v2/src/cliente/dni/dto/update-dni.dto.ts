import { PartialType } from '@nestjs/mapped-types';
import { CreateDniDto } from './create-dni.dto';

export class UpdateDniDto extends PartialType(CreateDniDto) {}
