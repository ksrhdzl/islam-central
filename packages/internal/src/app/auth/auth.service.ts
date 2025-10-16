import { ForbiddenError } from '@nestjs/apollo';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'general';
import { Repository } from 'typeorm';

import { AuthInput } from './dto/auth.input';
import { UserContext } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(CONTEXT)
    private readonly userContext: UserContext,
  ) {}

  async login(authInput: AuthInput): Promise<string> {
    const user = await this.userRepository.findOne({
      where: [{ email: authInput.identifier }],
    });
    if (!user) {
      throw new ForbiddenError('Invalid Credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      authInput.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new ForbiddenError('Invalid Credentials');
    }

    const token = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: this.configService.get<string>('JWT'),
        expiresIn: '12h',
      },
    );

    return token;
  }

  logout(): boolean {
    return true;
  }

  async account(): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: this.userContext.req.headers['user'].id },
      select: { password: false },
    });

    if (!user) throw new ForbiddenError('Invalid Credentials');

    return user;
  }
}
