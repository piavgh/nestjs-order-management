import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Product from './product.entity';
import ProductsService from './products.service';
import ProductsController from './products.controller';
import CreateProductDto from './dto/createProduct.dto';
import UpdateProductDto from './dto/updateProduct.dto';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<unknown>;
};

export const repositoryMockFactory: jest.Mock<{ findOne: jest.Mock<any, [undefined]> }, any[]> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}));

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;
  let repositoryMock: MockType<Repository<Product>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        // Provide your mock instead of the actual repository
        { provide: getRepositoryToken(Product), useFactory: repositoryMockFactory },
      ],
    }).compile();

    repositoryMock = moduleRef.get(getRepositoryToken(Product));
    productsService = moduleRef.get<ProductsService>(ProductsService);
    productsController = moduleRef.get<ProductsController>(ProductsController);
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const result = [
        new Product()
      ];
      jest.spyOn(productsService, 'getAllProducts').mockImplementation(() => Promise.resolve(result));

      expect(await productsController.getAllProducts()).toBe(result);
    });
  });

  describe('getProductById', () => {
    it('should return the correct product', async () => {
      const result = new Product();
      const productId = '1';
      jest.spyOn(productsService, 'getProductById').mockImplementation(() => Promise.resolve(result));

      expect(await productsController.getProductById(productId)).toBe(result);
    });
  });

  describe('createProduct', () => {
    it('should create the product', async () => {
      const result = new Product();
      const productDto = new CreateProductDto();
      jest.spyOn(productsService, 'createProduct').mockImplementation(() => Promise.resolve(result));

      expect(await productsController.createProduct(productDto)).toBe(result);
    });
  });

  describe('replaceProduct', () => {
    it('should replace the product', async () => {
      const result = new Product();
      const productId = '1';
      const updateProductDto = new UpdateProductDto();
      jest.spyOn(productsService, 'updateProduct').mockImplementation(() => Promise.resolve(result));

      expect(await productsController.replaceProduct(productId, updateProductDto)).toBe(result);
    });
  });

  describe('deleteProduct', () => {
    it('should delete the product', async () => {
      const productId = '1';
      jest.spyOn(productsService, 'deleteProduct').mockImplementation((productId) => Promise.resolve());

      await productsController.deleteProduct(productId);
      expect(productsService.deleteProduct).toBeCalled();
    });
  });
});
