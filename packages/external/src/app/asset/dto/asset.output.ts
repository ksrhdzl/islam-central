import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PresignedAssetOutput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  link: string;
}
