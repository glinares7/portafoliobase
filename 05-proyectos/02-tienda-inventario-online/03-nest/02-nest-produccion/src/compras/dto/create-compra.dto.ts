export class CreateCompraDto {
  id: number;

  sessioncompra: number;
  emailclientebase: string;
  sessionclientebase: number;

  estadoentrega: string;

  lugarentrega: string;

  pago: string;

  createAt: Date;
  updateAt: Date;

  // smartphone: Record<string, any>;
}
