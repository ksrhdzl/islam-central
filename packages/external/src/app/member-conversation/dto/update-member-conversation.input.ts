import { InputType, PartialType } from '@nestjs/graphql';

import { CreateMemberConversationInput } from './create-member-conversation.input';

@InputType()
export class UpdateMemberConversationInput extends PartialType(
  CreateMemberConversationInput,
) {}
