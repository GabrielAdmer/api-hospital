import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'src/config';
import { PayloadToken } from '../models/payloadToken.interface';

@Injectable()
export class JwtValidarStrategy extends PassportStrategy( Strategy, 'jwt' ) {

  constructor(
    @Inject( config.KEY ) congifService: ConfigType<typeof config>
  ) {
    super( {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: congifService.jwtScrete
    } );
  }

  async validate( payload: PayloadToken ) {
    return payload;
  }

}