import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';


@InputType()
class NewAddressInput {
    @Field()
    street: string;
    @Field()
    region: string;
    @Field()
    city: string;
    @Field()
    postcode: string;
    @Field()
    number: string;
    @Field()
    country: string;
    @Field()
    province: string;
}

@InputType()
export class NewShopInput {
    @Field()
    name: string;
    @Field()
    description: string;
    
    
    @Field(type => NewAddressInput)
    address: NewAddressInput;
  }

