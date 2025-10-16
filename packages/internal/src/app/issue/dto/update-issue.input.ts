import { InputType, PartialType } from '@nestjs/graphql';

import { CreateIssueInput } from './create-issue.input';

@InputType()
export class UpdateIssueInput extends PartialType(CreateIssueInput) {}
