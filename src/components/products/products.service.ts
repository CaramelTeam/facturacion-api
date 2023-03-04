import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProducRepository } from './repository/product.repository';

@Injectable()
export class ProductsService {

  constructor(
    private readonly productRepository: ProducRepository
  ) { }



  create(createProductDto: CreateProductDto) {
    return this.productRepository.storeProduct(createProductDto);
  }

  findAll() {
    return this.productRepository.getProduct();
  }

  findOne(id: number) {
    return this.productRepository.getById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
