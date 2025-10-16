import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class CreateProjectInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be a lowercase string with hyphens separating words.',
  })
  @Field(() => String)
  slug: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  workspaceId?: number;

  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSONObject, { nullable: true })
  metadata?: Record<string, unknown>;
}
