import { ArgsType, Field } from '@nestjs/graphql';

import { AuthInput } from './auth.input';

@ArgsType()
export class AuthArgs {
  @Field(() => AuthInput, { nullable: false })
  input: AuthInput;
}
