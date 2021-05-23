import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { JWTExpirationTime, JWTSecretKey } from './constants';
import { RoleController } from './controllers/role/role.controller';
import { RoleGuard } from './guards/role.guard';
import { RoleEntity } from './models/entities';
import { RefreshTokenEntity } from './models/entities/refresh-token.entity';
import { AuthService } from './services/auth/auth.service';
import { RoleService } from './services/role/role.service';
import { JwtStrategy } from './strategies';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWTSecretKey,
      signOptions: { expiresIn: JWTExpirationTime },
    }),
    TypeOrmModule.forFeature([RoleEntity, RefreshTokenEntity]),
  ],
  controllers: [RoleController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RoleService, RoleGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
