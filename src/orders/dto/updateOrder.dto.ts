export class UpdateOrderDto {
  id: number;
  orderCode: string;
  orderType: string;
  products: string[];
  orderStatus: string;
  quantity: number;
  totalPrice: number;
}

export default UpdateOrderDto;
