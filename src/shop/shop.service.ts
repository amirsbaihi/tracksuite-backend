import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Shop } from '@prisma/client';
import { NewShopInput } from './dto/new-shop.input';
import { ShopArgs } from './dto/shop.args';

@Injectable()
export class ShopService {
  async findOneById(id: string) {
      return await this.prisma.shop.findUnique({where:{id}});
  }
  async findAll(shopArgs: ShopArgs): Promise<import("./models/shop.model").Shop[]> {
    return await this.prisma.shop.findMany();
  }
  async create(newShopData: NewShopInput) {
    return await this.prisma.shop.create({data:newShopData});
  }
  async remove(id: string) {
    return await this.prisma.shop.delete({where:{id}});
  }
  constructor(
    private prisma:PrismaService,
  ) {}
}
