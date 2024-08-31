import { Injectable, Inject, HttpException, NotFoundException } from '@nestjs/common';
import { FACTU_DATA_SOURCE } from '../../../constants/index';
import { DataSource, UpdateResult } from 'typeorm';
import { ProductE } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductNotFoundException } from '../exceptions/notFound.exception';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PaginationI } from '../../../helpers/interfaces/pagination.interface';
import { ProductApiServices } from '../api/facturapi.product.services';

@Injectable()
export class ProducRepository {
    constructor(
        @Inject(FACTU_DATA_SOURCE)
        private readonly dataSource: DataSource,
        private readonly api: ProductApiServices
    ) { }

    private readonly productRepository = this.dataSource.getRepository(ProductE)

    async getProduct(pagination: PaginationI) {
        if (!pagination.page) pagination.page = 1;
        if (!pagination.perPage) pagination.perPage = 10;
        const products = await this.productRepository.findAndCount({
            skip: (pagination.page - 1) * pagination.perPage,
            take: pagination.perPage
        });

        return {
            data: products[0],
            metadata: {
                page: +pagination.page,
                total: products[1]
            }
        }
    }

    async getCatalogUnits(pagination: PaginationI) {
        if (!pagination.page) pagination.page = 1;
        if (!pagination.perPage) pagination.perPage = 10;
        const products = await this.api.getCatalogUnits(pagination);
        return {
            data: products.data,
            metadata: {
                page: +pagination.page,
                total: products.total
            }
        }
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

    async updateById(id: number, updateproduct: UpdateProductDto): Promise<UpdateResult> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException('Product');
        }
        return await this.productRepository.update(id, updateproduct);
    }

    async deleteById(id: number): Promise<UpdateResult> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException('Product');
        }
        return await this.productRepository.softDelete(id);
    }

}