import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { User as UserDB} from '@prisma/client';


@ObjectType()
export class User {
  @Field(() => String)
  id: UserDB[`id`];
  @Field(() => GraphQLISODateTime)
  createdAt: UserDB[`createdAt`];
  @Field(() => GraphQLISODateTime)
  updatedAt: UserDB[`updatedAt`];

  @Field(() => String)
  email: UserDB[`email`];
  @Field(() => String)
  name: UserDB[`name`];
  @Field(() => String)
  surname: UserDB[`surname`];
  
  @Field(() => [String])
  shops: UserDB[`shops`];
  
}