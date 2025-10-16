import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from '@/dto';

@ObjectType('Workspace')
export class WorkspaceDTO extends Base {
  @Field(() => String, { nullable: false })
  name?: string;

  @Field(() => String, { nullable: false })
  slug!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  image?: string;
}
