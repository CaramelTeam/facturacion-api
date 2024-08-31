import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProducRepository } from './repository/product.repository';
import { ProductApiServices } from './api/facturapi.product.services';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProducRepository, ProductApiServices]
})
export class ProductsModule { }
