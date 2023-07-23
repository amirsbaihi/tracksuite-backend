import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  NewCredentialsInput,
  SignInCredentialsInput,
} from './dto/credentials.input';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { aargon2Constants, jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signUp(credentials: NewCredentialsInput) {
    const hashedPassword = await argon2.hash(credentials.password, {
      secret: Buffer.from(aargon2Constants.secret),
    });
    const res = await Promise.all([
      this.prisma.credentials.create({
        data: { email: credentials.email, password: hashedPassword },
      }),
      this.userService.create(credentials.user),
    ]);
    console.log("User signed up")
    return res
  }
  async signIn(credentials: SignInCredentialsInput) {
    const userCredentials = await this.prisma.credentials.findUnique({
      where: { email: credentials.email },
    });
    if (userCredentials) {
      if (
        await argon2.verify(userCredentials.password, credentials.password, {
          secret: Buffer.from(aargon2Constants.secret),
        })
      ) {
        const user = await this.userService.findOneByEmail(
          userCredentials.email,
        );
        const payload = { id: user.id, email: user.email };
        console.log("User signed in")
        return {
          access_token: await this.jwtService.signAsync(payload, {
            secret: Buffer.from(jwtConstants.secret),
          }),
        };
      }
    }
    throw new UnauthorizedException();
  }
}
