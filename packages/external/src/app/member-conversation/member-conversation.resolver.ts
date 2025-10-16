import { Resolver } from '@nestjs/graphql';

import { MemberConversationService } from './member-conversation.service';

@Resolver()
export class MemberConversationResolver {
  constructor(
    private readonly memberConversationService: MemberConversationService,
  ) {}
}
