import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Order from './order.entity';
import CreateOrderDto from './dto/createOrder.dto';
import UpdateOrderDto from './dto/updateOrder.dto';

@Injectable()
export default class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  getAllOrders() {
    return this.ordersRepository.find();
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
