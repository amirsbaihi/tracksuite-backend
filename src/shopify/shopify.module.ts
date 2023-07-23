import { Module } from '@nestjs/common';
import { ShopifyService } from './shopify.service';
import { ShopifyController } from './shopify.controller';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion } from '@shopify/shopify-api';
import {MongoDBSessionStorage} from '@shopify/shopify-app-session-storage-mongodb'

const hostScheme:( "http"|"https")="https"

const shopifyOptions={
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
  scopes: ['read_products'],
  hostName: '7116-151-32-47-5.ngrok-free.app',
  hostScheme,
  apiVersion: ApiVersion.April23,
  isEmbeddedApp: false,
  sessionStorage: new MongoDBSessionStorage(new URL(process.env.MONGO_URL), "tracksuite")
}

@Module({
  providers: [
    {
      provide: "SHOPIFY_API",
      useFactory: () => shopifyApi(shopifyOptions),
    },
    ShopifyService],
  controllers: [ShopifyController]
})
export class ShopifyModule {}
