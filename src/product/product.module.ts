import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProdcutResolver } from './product.resolver';
import { UserService } from 'src/user/user.service';
@Module({
  providers: [ProductService, ProdcutResolver, UserService],
  exports: [ProductService],
})
export class ProductModule {}
