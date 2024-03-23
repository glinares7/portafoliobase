import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfilclienteDto } from './create-perfilcliente.dto';

export class UpdatePerfilclienteDto extends PartialType(CreatePerfilclienteDto) {}
