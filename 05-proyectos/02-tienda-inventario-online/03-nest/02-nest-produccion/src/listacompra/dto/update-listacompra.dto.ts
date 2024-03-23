import { PartialType } from '@nestjs/mapped-types';
import { CreateListacompraDto } from './create-listacompra.dto';

export class UpdateListacompraDto extends PartialType(CreateListacompraDto) {}
