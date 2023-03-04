import { Injectable, Inject, HttpException } from '@nestjs/common';
import { FACTU_DATA_SOURCE } from '../../../constants/index';
import { DataSource } from 'typeorm';
import { ProductE } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductNotFoundException } from '../exceptions/notFound.exception';

@Injectable()
export class ProducRepository {
    constructor(
        @Inject(FACTU_DATA_SOURCE)
        private readonly dataSource: DataSource
    ) { }

    private readonly productRepository = this.dataSource.getRepository(ProductE)

    async getProduct(): Promise<ProductE[]> {
        return await this.productRepository.find();
    }


    async storeProduct(product: CreateProductDto) {
        const newProduct = this.productRepository.create(product);
        return await this.productRepository.save(newProduct);
    }

    async getById(id: number): Promise<ProductE> {
        const data = await this.productRepository.findOne({ where: { id } })
        if (!data) {
            throw new ProductNotFoundException();
        }
        return data;
    }


}