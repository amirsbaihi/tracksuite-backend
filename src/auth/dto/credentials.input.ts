import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { NewUserInput } from 'src/user/dto/new-user.input';

@InputType()
export class NewCredentialsInput {
    @Field()
    email: string;
    @Field()
    password: string;
    @Field()
    user: NewUserInput;
}

@InputType()
export class SignInCredentialsInput {
    @Field()
    email: string;
    @Field()
    password: string;
}