export class CreateOrderDto {
  orderCode: string;
  orderType: string;
  products: string[];
  orderStatus: string;
  quantity: number;
  totalPrice: number;
}

export default CreateOrderDto;
