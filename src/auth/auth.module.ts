import { ExecutionContext, Global, Module, createParamDecorator } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { jwtConstants } from './constants';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data, pt) => pt.args[2].req.user
);

@Global()
@Module({
  imports:[UserModule, JwtModule, Reflector, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
