import { Field, GraphQLISODateTime, Int, ObjectType, } from '@nestjs/graphql';
import { Shop as ShopDB, Address as AddressDB} from '@prisma/client';
import { IsOptional } from 'class-validator';


@ObjectType()
export class Shop {
  @Field(() => String)
  id: ShopDB[`id`];
  @Field(() => GraphQLISODateTime)
  createdAt: ShopDB[`createdAt`];
  @Field(() => GraphQLISODateTime)
  updatedAt: ShopDB[`updatedAt`];

  @Field(() => String)
  name: ShopDB[`name`];
  @Field(() => String)
  description: ShopDB[`description`];
  @Field(() => Address)
  address: ShopDB[`address`];
  @IsOptional()
  @Field(()=>Int)
  productCount?: number;
  @Field(() => [String])
  media: ShopDB[`media`];
  
}

@ObjectType()
class Address {
  @Field(() => String)
  street: AddressDB[`street`];

  @Field(() => String)
  region: AddressDB[`region`];
  @Field(() => String)
  city: AddressDB[`city`];
  @Field(() => String)
  postcode: AddressDB[`postcode`];
  @Field(() => String)
  number: AddressDB[`number`];
  @Field(() => String)
  country: AddressDB[`country`];
  @Field(() => String)
  province: AddressDB[`province`];
  
}