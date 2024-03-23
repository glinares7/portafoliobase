import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailclienteDto } from './create-emailcliente.dto';

export class UpdateEmailclienteDto extends PartialType(CreateEmailclienteDto) {}
