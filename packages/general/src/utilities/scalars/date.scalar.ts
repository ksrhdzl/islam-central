import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { GraphQLDateTime } from 'graphql-scalars';

@Scalar('Date', () => GraphQLDateTime)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: string): Date {
    return new Date(value); // client -> server
  }

  serialize(value: Date): string {
    return value.toISOString(); // server -> client
  }

  parseLiteral(ast: ValueNode): any {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  }
}
