import { GqlExecutionContext } from '@nestjs/graphql';

export class UserDTO {
  id: number;
  roles: { permissions: string[] }[];
}

export type UserContext = GqlExecutionContext & {
  req: {
    headers: {
      user: UserDTO;
    };
  };
};
