import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { User } from "./models/user.model";
import { UserService } from "./user.service";
import { NewUserInput } from './dto/new-user.input';
import { AuthGuard } from 'src/auth/auth.guard';
import {Request } from '@nestjs/common';

const pubSub = new PubSub();

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  /*
  
  @Query(returns => User)
  async user(@Request() req,@Args('id') id: string): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Mutation(returns => User)
  async addUser(
    @Args('newUserData') newUserData: NewUserInput,
  ): Promise<User> {
    const user = await this.userService.create(newUserData);
    pubSub.publish('userAdded', { userAdded: user });
    return user;
  }

  @Mutation(returns => Boolean)
  async removeUser(@Args('id') id: string) {
    this.userService.remove(id);
    return true;
  }

  @Subscription(returns => User)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }*/
}