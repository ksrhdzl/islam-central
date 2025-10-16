import { InputType, PartialType } from '@nestjs/graphql';

import { CreateConversationInput } from './create-conversation.input';

@InputType()
export class UpdateConversationInput extends PartialType(
  CreateConversationInput,
) {}
