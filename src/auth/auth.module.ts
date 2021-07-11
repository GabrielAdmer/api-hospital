import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';

import { AuthService } from './services/auth.service';

import { AuthController } from './controllers/auth.controller';

import { LoginLocalStrategy } from './estrategies/login-local.strategy';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { JwtValidarStrategy } from './estrategies/jwtValidar.strategy';

@Module( {
  providers: [ AuthService, LoginLocalStrategy, JwtValidarStrategy ],
  controllers: [ AuthController ],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync( {
      inject: [ config.KEY ],
      useFactory: ( configService: ConfigType<typeof config> ) => {
        return {
          secret: configService.jwtScrete,
          signOptions: {
            expiresIn: '12h'
          }
        };
      }
    } )
  ],
} )
export class AuthModule { }
