/* eslint-disable */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'general';
import { EntityManager, IsNull, Not } from 'typeorm';

@Injectable()
export class AuthMiddleware implements CanActivate {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly entityManager: EntityManager,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const { req } = ctx.getContext();

    const authorization: string | null =
      req.headers.authorization?.split('Bearer ')[1] || null;

    if (!authorization) {
      this.logger.warn('Authorization header missing or malformed');
      throw new UnauthorizedException(
        'Authorization token missing or malformed',
      );
    }

    req.headers['user'] = null;

    try {
      const decoded = this.jwtService.verify(authorization, {
        secret: this.configService.get<string>('JWT'),
      });

      const user = await this.entityManager
        .createQueryBuilder(UserEntity, 'user')
        .leftJoinAndSelect('user.members', 'members')
        .where('user.id = :id', { id: decoded.id })
        .andWhere('members.id IS NOT NULL')
        .select(['user.id'])
        .getOne();

      if (!user) {
        this.logger.warn(`User with id ${decoded.id} not found`);
        throw new UnauthorizedException('Invalid token: user not found');
      }

      req.headers['user'] = user;

      return true;
    } catch (error) {
      this.logger.error(error.message);
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
