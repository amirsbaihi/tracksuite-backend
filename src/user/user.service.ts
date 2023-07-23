import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { NewUserInput } from './dto/new-user.input';

@Injectable()
export class UserService {
  async addShop(user:User,shopId:string) {
    await this.prisma.user.update({data:{shops:[...user.shops, shopId]},where:{id:user.id}})
  }
  async findOneById(id: string) {
      return await this.prisma.user.findUnique({where:{id}});
  }
  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({where:{email}});
}
  async create(newUserData: NewUserInput) {
    return await this.prisma.user.create({data:newUserData});
  }
  async remove(id: string) {
    return await this.prisma.user.delete({where:{id}});
  }
  constructor(
    private prisma:PrismaService,
  ) {}
}
