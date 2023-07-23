import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewProductInput {
    @Field()
    title: string;
    @Field()
    description: string;
    @Field(type => [String])
    optionNames: Array<string>;
    
    @Field(type => [NewVariantInput])
    variants: Array<NewVariantInput>;
    @Field()
    brand: string;
    @Field()
    category: string;
    @Field({ nullable: true })
    parent?: string;
    @Field()
    owner: string;
  }
  
  @InputType()
  class NewVariantInput{
    @Field(type => [String])
    optionValues: Array<string>;
    @Field(type => [String])
    media: Array<string>;
    @Field()
    barcode: string;
    @Field()
    price: number;
    @Field()
    quantity: number;
  }