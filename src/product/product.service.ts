import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';
import { ProductArgs } from './dto/product.args';
import { NewProductInput } from './dto/new-product.input';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma:PrismaService,
    private userService:UserService,
  ) {}
  async shopProductCount(shopId: string) {
    return await this.prisma.product.count({where:{owner:shopId}})
  }
  async findOneById(id: string) {
      return await this.prisma.product.findUnique({where:{id}});
  }
  async findAll(prodcutArgs: ProductArgs, userId: string): Promise<import("./models/product.model").Product[]> {
    let {shops} = await this.userService.findOneById(userId)
    return await this.prisma.product.findMany({where:{owner:{in:shops}}});
  }
  async create(newProductData: NewProductInput) {
    return await this.prisma.product.create({data:newProductData});
  }
  async remove(id: string) {
    return await this.prisma.product.delete({where:{id}});
  }
  
  async save(...products:Array<Product>) {
    return await this.prisma.product.createMany({data:products});
  }
}
