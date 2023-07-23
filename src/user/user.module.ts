import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { NewUserInput } from './dto/new-user.input';

@Module({
    imports:[NewUserInput],
    providers: [UserService, UserResolver],
    exports: [UserService, NewUserInput],
  })
export class UserModule {}