import { Module } from '@nestjs/common';
import { ShopResolver } from './shop.resolver';
import { ShopService } from './shop.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';

@Module({
    imports:[UserModule, AuthModule, ProductModule],
    providers: [ShopService, ShopResolver],
    exports: [ShopService],
  })
export class ShopModule {}