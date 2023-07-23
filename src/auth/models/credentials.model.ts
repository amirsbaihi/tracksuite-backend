import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Credentials as CredentialsDB} from '@prisma/client';


@ObjectType()
export class User {
  @Field(() => String)
  id: CredentialsDB[`id`];
  @Field(() => GraphQLISODateTime)
  createdAt: CredentialsDB[`createdAt`];
  @Field(() => GraphQLISODateTime)
  updatedAt: CredentialsDB[`updatedAt`];

  @Field(() => String)
  email: CredentialsDB[`email`];
  @Field(() => String)
  password: CredentialsDB[`password`];
}