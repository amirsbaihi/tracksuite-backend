import { Field, Float, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Product as ProductDB, Variant as VariantDB } from '@prisma/client';

@ObjectType()
export class Product {
  @Field(() => String)
  id: ProductDB[`id`];

  @Field(() => GraphQLISODateTime)
  createdAt: ProductDB[`createdAt`];

  @Field(() => GraphQLISODateTime)
  updatedAt: ProductDB[`updatedAt`];

  @Field(() => String)
  title: ProductDB[`title`];

  @Field(() => String)
  description: ProductDB[`description`];
  @Field(() => [String])
  optionNames: ProductDB[`optionNames`];
  @Field(() => [Variant])
  variants: ProductDB[`variants`];
  @Field(() => String)
  brand: ProductDB[`brand`];
  @Field(() => String)
  category: ProductDB[`category`];
  @Field(() => String)
  parent: ProductDB[`parent`];
  @Field(() => String)
  owner: ProductDB[`owner`];

  @Field(() => [String])
  allMedia?: String[];
  @Field(() => [Float])
  priceRange?: number[];
  @Field(() => Int)
  totQuantity?: number;
  @Field(() => Int)
  variantNumber?: number;
}

@ObjectType()
export class Variant {
  @Field(() => [String])
  optionValues: VariantDB[`optionValues`];
  @Field(() => [String])
  media: VariantDB[`media`];
  @Field(() => String)
  barcode: VariantDB[`barcode`];
  @Field(() => Number)
  price: VariantDB[`price`];
  @Field(() => Int)
  quantity: VariantDB[`quantity`];
}