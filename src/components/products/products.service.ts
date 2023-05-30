import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProducRepository } from './repository/product.repository';
import { PaginationI } from '../../helpers/interfaces/pagination.interface';

@Injectable()
export class ProductsService {

  constructor(
    private readonly productRepository: ProducRepository
  ) { }



  create(createProductDto: CreateProductDto) {
    return this.productRepository.storeProduct(createProductDto);
  }

  findAll(pagination: PaginationI) {
    return this.productRepository.getProduct(pagination);
  }

  findOne(id: number) {
    return this.productRepository.getById(id);
  }


  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.updateById(id, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.deleteById(id);
  }
}
