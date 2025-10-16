import { InputType, PartialType } from '@nestjs/graphql';

import { CreateMemberIssueInput } from './create-member-issue.input';

@InputType()
export class UpdateMemberIssueInput extends PartialType(
  CreateMemberIssueInput,
) {}
