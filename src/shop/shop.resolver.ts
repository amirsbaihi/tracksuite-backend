import { NotFoundException, UseGuards, Request, UnauthorizedException, Post } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Shop } from "./models/shop.model";
import { ShopService } from "./shop.service";
import { NewShopInput } from './dto/new-shop.input';
import { ShopArgs } from './dto/shop.args';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { User } from 'src/auth/auth.module';
import { ProductService } from './../product/product.service';

const pubSub = new PubSub();

@Resolver(of => Shop)
export class ShopResolver {
  constructor(private readonly shopService: ShopService,
    private userService:UserService,
    private productService:ProductService) {}
  
  @Query(returns => Shop)
  async shop(@Args('id') id: string, @User() userData): Promise<Shop> {
    const user = await this.userService.findOneById(userData.id)
    const shop = await this.shopService.findOneById(id);
    if (!shop) {
      throw new NotFoundException(id);
    }
    if(!user.shops.includes(shop.id))
      throw new UnauthorizedException()
    return shop;
  }
  
  @Query(returns => [Shop])
  async shops(@Args() shopArgs: ShopArgs, @User() userData): Promise<Shop[]> {
    const user = await this.userService.findOneById(userData.id)
    let shops= await this.shopService.findAll(shopArgs)

    if(!shops.every(s=>user.shops.includes(s.id)))
      throw new UnauthorizedException()
    return shops;
  }
  @ResolveField('productCount', returns => Int)
  async getPosts(@Parent() shop: Shop) {
    return await this.productService.shopProductCount(shop.id);
  }
  
  @Mutation(returns => Shop)
  async addShop( 
    @Args('newShopData') newShopData: NewShopInput,
    @User() userData
  ): Promise<Shop> {
    const user = await this.userService.findOneById(userData.id)
    
    const shop = await this.shopService.create(newShopData);
    await this.userService.addShop(user,shop.id)
    pubSub.publish('shopAdded', { shopAdded: shop });
    return {...shop, productCount:0};
  }
  
  @Mutation(returns => Boolean)
  async removeShop(@Args('id') id: string, @User() userData) {
    const user = await this.userService.findOneById(userData.id)
    if(!user.shops.includes(id))
      throw new UnauthorizedException()
    this.shopService.remove(id);
    return true;
  }

  @Subscription(returns => Shop)
  shopAdded() {
    return pubSub.asyncIterator('shopAdded');
  }
}