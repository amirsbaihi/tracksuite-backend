import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewUserInput {
    @Field()
    name: string;
    @Field()
    surname: string;
    
    
    @Field()
    email: string;
    @Field(type => [String])
    shops: Array<string>;
  }