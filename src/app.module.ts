import { ExecutionContext, Module, createParamDecorator } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GqlExecutionContext, GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { ShopifyModule } from './shopify/shopify.module';
import { ApiVersion } from '@shopify/shopify-api';
import { ImportModule } from './import/import.module';



@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot(),
    ProductModule,
    ShopModule,
    UserModule,
    PrismaModule,
    AuthModule,
    JwtModule,
    UploadModule,
    ShopifyModule,
    ImportModule
  ],

  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AppModule {}

