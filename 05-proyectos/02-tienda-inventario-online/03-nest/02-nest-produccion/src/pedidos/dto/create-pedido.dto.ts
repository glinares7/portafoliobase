export class CreatePedidoDto {
  id: number;
  smartphone: Record<string, any>;
  cantidad: number;
  subtotal: number;
  createAt: Date;
  updateAt: Date;
}
