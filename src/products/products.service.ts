import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Product from './product.entity';
import CreateProductDto from './dto/createProduct.dto';
import UpdateProductDto from './dto/updateProduct.dto';

@Injectable()
export default class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  getAllProducts() {
    return this.productsRepository.find();
  }

  async getProductById(id: number) {
    const product = await this.productsRepository.findOne(id);
    if (product) {
      return product;
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  async createProduct(product: CreateProductDto) {
    const newProduct = await this.productsRepository.create(product);
    await this.productsRepository.save(newProduct);
    return newProduct;
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOne(id);
    if (updatedProduct) {
      return updatedProduct
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  async deleteProduct(id: number) {
    const deleteResponse = await this.productsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }
}
