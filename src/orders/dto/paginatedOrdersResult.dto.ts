import Order from '../order.entity';

export class PaginatedOrdersResultDto {
  data: Order[];
  page: number;
  limit: number;
  totalCount: number;
}
