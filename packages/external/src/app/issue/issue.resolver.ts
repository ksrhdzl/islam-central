import { Resolver } from '@nestjs/graphql';

import { IssueService } from './issue.service';

@Resolver()
export class IssueResolver {
  constructor(private readonly issueService: IssueService) {}
}
