import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Args, Float, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Product } from "./models/product.model";
import { ProductService } from "./product.service";
import { ProductArgs } from './dto/product.args';
import { NewProductInput } from './dto/new-product.input';
import { User } from 'src/auth/auth.module';
import { UserService } from './../user/user.service';

const pubSub = new PubSub();

@Resolver(of => Product)
export class ProdcutResolver {
  constructor(private readonly productService: ProductService,
    private readonly userService: UserService) {}

  @Query(returns => Product)
  async product(@Args('id') id: string, @User() userData): Promise<Product> {
    const user = await this.userService.findOneById(userData.id)
    const product = await this.productService.findOneById(id);
    if (!product) {
      throw new NotFoundException(id);
    }
    if(!user.shops.includes(product.owner))
      throw new UnauthorizedException();
    return product;
  }

  @Query(returns => [Product])
  products(@Args() prodcutArgs: ProductArgs, @User() userData): Promise<Product[]> {
    console.log(userData)
    return this.productService.findAll(prodcutArgs, userData.id);
  }

  @ResolveField('priceRange', returns => [Float])
  priceRange(@Parent() product: Product) {
    const priceArray = product.variants.map(({price})=>price);
    return [Math.min(...priceArray), Math.max(...priceArray)]
  }

  @ResolveField('allMedia', returns => [String])
  allMedia(@Parent() product: Product) {
    const allMedia = product.variants.flatMap(({media})=>media);
    return allMedia
  }
  @ResolveField('totQuantity', returns => Int)
  totQuantity(@Parent() product: Product) {
    const totQuantity = product.variants.map(({quantity})=>quantity).reduce((partialSum, a) => partialSum + a, 0);
    return totQuantity
  }
  @ResolveField('variantNumber', returns => Int)
  variantNumber(@Parent() product: Product) {
    const variantNumber = product.variants.length;
    return variantNumber
  }


  @Mutation(returns => Product)
  async addProduct(
    @Args('newProductData') newProductData: NewProductInput, @User() userData
  ): Promise<Product> {
    const product = await this.productService.create(newProductData);
    pubSub.publish('productAdded', { productAdded: product });
    return product;
  }

  @Mutation(returns => Boolean)
  async removeProduct(@Args('id') id: string) {
    this.productService.remove(id);
    return true;
  }

  @Subscription(returns => Product)
  productAdded() {
    return pubSub.asyncIterator('productAdded');
  }
}