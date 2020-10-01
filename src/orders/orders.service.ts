import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Order from './order.entity';
import CreateOrderDto from './dto/createOrder.dto';
import UpdateOrderDto from './dto/updateOrder.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedOrdersResultDto } from "./dto/paginatedOrdersResult.dto";

@Injectable()
export default class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async getAllOrders(paginationDto: PaginationDto): Promise<PaginatedOrdersResultDto> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

    const totalCount = await this.ordersRepository.count()
    const orders = await this.ordersRepository.createQueryBuilder()
      .orderBy('id', "DESC")
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany()

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: orders,
    }
  }

  async getOrderById(id: number) {
    const order = await this.ordersRepository.findOne(id);
    if (order) {
      return order;
    }
    throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
  }

  async createOrder(order: CreateOrderDto) {
    const newOrder = await this.ordersRepository.create(order);
    await this.ordersRepository.save(newOrder);
    return newOrder;
  }

  async updateOrder(id: number, order: UpdateOrderDto) {
    await this.ordersRepository.update(id, order);
    const updatedOrder = await this.ordersRepository.findOne(id);
    if (updatedOrder) {
      return updatedOrder
    }
    throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
  }

  async deleteOrder(id: number) {
    const deleteResponse = await this.ordersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }
}
