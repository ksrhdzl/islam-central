import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserDTO } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthArgs } from './dto/auth.args';
import { AuthOutput } from './dto/auth.output';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthOutput)
  async login(@Args() args: AuthArgs): Promise<AuthOutput> {
    const token = await this.authService.login(args.input);
    return { token: token };
  }

  @Mutation(() => Boolean)
  logout(): boolean {
    return this.authService.logout();
  }

  @Query(() => UserDTO)
  @UseGuards(AuthMiddleware)
  async account(): Promise<any> {
    return this.authService.account();
  }
}
