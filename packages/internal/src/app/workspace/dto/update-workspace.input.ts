import { InputType, PartialType } from '@nestjs/graphql';

import { CreateWorkspaceInput } from './create-workspace.input';

@InputType()
export class UpdateWorkspaceInput extends PartialType(CreateWorkspaceInput) {}
