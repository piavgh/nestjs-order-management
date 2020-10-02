import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import Order from './order.entity';
import CreateOrderDto from './dto/createOrder.dto';
import UpdateOrderDto from './dto/updateOrder.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedOrdersResultDto } from "./dto/paginatedOrdersResult.dto";
import { FilteringDto } from './dto/filtering.dto';

@Injectable()
export default class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  private static getFilterQuery(
    filteringDto: FilteringDto,
    ordersQueryBuilder: SelectQueryBuilder<Order>
  ): SelectQueryBuilder<Order> {
    let ordersFilterQuery = ordersQueryBuilder;

    if (filteringDto.id) {
      ordersFilterQuery = ordersQueryBuilder
        .where('orders.id = :id', {
          id: filteringDto.id,
        });
    }

    if (filteringDto.orderCode) {
      ordersFilterQuery = ordersFilterQuery
        .andWhere('orders.orderCode = :orderCode', {
          orderCode: filteringDto.orderCode,
        });
    }

    if (filteringDto.orderType) {
      ordersFilterQuery = ordersFilterQuery
        .andWhere('orders.orderType = :orderType', {
          orderType: filteringDto.orderType,
        });
    }

    if (filteringDto.orderStatus) {
      ordersFilterQuery = ordersFilterQuery
        .andWhere('orders.orderStatus = :orderStatus', {
          orderStatus: filteringDto.orderStatus,
        });
    }

    return ordersFilterQuery;
  }

  async getAllOrders(paginationDto: PaginationDto, filteringDto: FilteringDto): Promise<PaginatedOrdersResultDto> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

    const totalCount = await this.ordersRepository.count()
    const ordersQueryBuilder = this.ordersRepository.createQueryBuilder('orders');

    const ordersFilterQuery = OrdersService.getFilterQuery(filteringDto, ordersQueryBuilder);

    const orders = await ordersFilterQuery
      .orderBy('id', 'DESC')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();

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
