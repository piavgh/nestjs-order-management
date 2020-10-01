import { Body, Controller, Get, Post, Put, Delete, Param, Query } from '@nestjs/common';
import OrdersService from './orders.service';
import CreateOrderDto from './dto/createOrder.dto';
import UpdateOrderDto from './dto/updateOrder.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedOrdersResultDto } from './dto/paginatedOrdersResult.dto';

@Controller('orders')
export default class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) {}

  @Get()
  getAllOrders(@Query() paginationDto: PaginationDto): Promise<PaginatedOrdersResultDto> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);

    return this.ordersService.getAllOrders({
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
    });
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(Number(id));
  }

  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    return this.ordersService.createOrder(order);
  }

  @Put(':id')
  async replaceOrder(@Param('id') id: string, @Body() order: UpdateOrderDto) {
    return this.ordersService.updateOrder(Number(id), order);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(Number(id));
  }
}
