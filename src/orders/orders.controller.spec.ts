import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Order from './order.entity';
import OrdersService from './orders.service';
import OrdersController from './orders.controller';
import CreateOrderDto from './dto/createOrder.dto';
import UpdateOrderDto from './dto/updateOrder.dto';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<unknown>;
};

export const repositoryMockFactory: jest.Mock<{ findOne: jest.Mock<any, [undefined]> }, any[]> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}));

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;
  let repositoryMock: MockType<Repository<Order>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        // Provide your mock instead of the actual repository
        { provide: getRepositoryToken(Order), useFactory: repositoryMockFactory },
      ],
    }).compile();

    repositoryMock = moduleRef.get(getRepositoryToken(Order));
    ordersService = moduleRef.get<OrdersService>(OrdersService);
    ordersController = moduleRef.get<OrdersController>(OrdersController);
  });

  describe('getOrderById', () => {
    it('should return the correct order', async () => {
      const result = new Order();
      const orderId = '1';
      jest.spyOn(ordersService, 'getOrderById').mockImplementation(() => Promise.resolve(result));

      expect(await ordersController.getOrderById(orderId)).toBe(result);
    });
  });

  describe('createOrder', () => {
    it('should create the order', async () => {
      const result = new Order();
      const orderDto = new CreateOrderDto();
      jest.spyOn(ordersService, 'createOrder').mockImplementation(() => Promise.resolve(result));

      expect(await ordersController.createOrder(orderDto)).toBe(result);
    });
  });

  describe('replaceOrder', () => {
    it('should replace the order', async () => {
      const result = new Order();
      const orderId = '1';
      const updateOrderDto = new UpdateOrderDto();
      jest.spyOn(ordersService, 'updateOrder').mockImplementation(() => Promise.resolve(result));

      expect(await ordersController.replaceOrder(orderId, updateOrderDto)).toBe(result);
    });
  });

  describe('deleteOrder', () => {
    it('should delete the order', async () => {
      const orderId = '1';
      jest.spyOn(ordersService, 'deleteOrder').mockImplementation((orderId) => Promise.resolve());

      await ordersController.deleteOrder(orderId);
      expect(ordersService.deleteOrder).toBeCalled();
    });
  });
});
