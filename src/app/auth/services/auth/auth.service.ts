import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../../../user/models/entities';
import { UserCredService } from '../../../user/services/user-cred/user-cred.service';
import { UserService } from '../../../user/services/user/user.service';
import { RefreshTokenEntity } from '../../models/entities/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userCredService: UserCredService,
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshTokenEntity)
    private readonly tokenRepo: Repository<RefreshTokenEntity>,
    private readonly userService: UserService,
  ) {}

  validateUser(username: string, password: string) {
    return this.userCredService.findOne(username, password);
  }

  async login(user) {
    const token = await this._generateRefreshToken(user.id);
    return this._generateTokens(user, token.id);
  }

  private _generateTokens(user, tokenId) {
    return {
      access_token: this.jwtService.sign({ user }),
      refresh_token: this.jwtService.sign(
        {},
        { jwtid: tokenId, subject: user.id },
      ),
    };
  }

  async _generateRefreshToken(user) {
    const userDTO = new UserEntity();
    userDTO.id = user;
    const record = this.tokenRepo.create({ user: userDTO });
    return this.tokenRepo.save(record);
  }

  async refresh(refToken: string) {
    const data = this.jwtService.decode(refToken) as any;
    if (data) {
      const tokenEntity = await this.tokenRepo.findOne(data.jti);
      if (tokenEntity) {
        const user = await this.userService.findByID(data.sub);
        return this._generateTokens(user, tokenEntity.id);
      } else {
        throw new UnauthorizedException('Please login again');
      }
    } else {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async revokeToken(userId: string) {
    this.tokenRepo.delete({ user: { id: userId } });
  }
}
