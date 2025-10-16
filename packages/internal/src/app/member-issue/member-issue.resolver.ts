import { Resolver } from '@nestjs/graphql';

import { MemberIssueService } from './member-issue.service';

@Resolver()
export class MemberIssueResolver {
  constructor(private readonly memberIssueService: MemberIssueService) {}
}
