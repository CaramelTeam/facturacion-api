import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProducRepository } from './repository/product.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProducRepository]
})
export class ProductsModule {}
