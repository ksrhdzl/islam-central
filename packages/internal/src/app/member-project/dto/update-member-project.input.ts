import { InputType, PartialType } from '@nestjs/graphql';

import { CreateMemberProjectInput } from './create-member-project.input';

@InputType()
export class UpdateMemberProjectInput extends PartialType(
  CreateMemberProjectInput,
) {}
