import { Field, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import * as bcrypt from 'bcrypt';
import { Base } from '@/dto';

import { CreateUserInput } from './create-user.input';

@ObjectType('User')
@BeforeCreateOne(async (input: CreateOneInputType<CreateUserInput>) => {
  const password = await bcrypt.hash(input.input.password, 11);
  return {
    input: { ...input.input, password: password },
  };
})
export class UserDTO extends Base {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}
