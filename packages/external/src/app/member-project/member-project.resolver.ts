import { Resolver } from '@nestjs/graphql';

import { MemberProjectService } from './member-project.service';

@Resolver()
export class MemberProjectResolver {
  constructor(private readonly memberProjectService: MemberProjectService) {}
}
