import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { IssueStatusEnum } from 'general';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class CreateIssueInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name: string;

  @IsOptional()
  @IsEnum(IssueStatusEnum)
  @Field(() => IssueStatusEnum, { nullable: true })
  status?: IssueStatusEnum;

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

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  projectId?: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  position?: number;

  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSONObject, { nullable: true })
  metadata?: Record<string, unknown>;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  startAt?: Date | null;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  endAt?: Date | null;
}
