import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginLocalStrategy extends PassportStrategy( Strategy, 'local-login' ) {

  constructor(
    private authService: AuthService
  ) {
    super( {
      usernameField: 'email',
      passwordField: 'password',
    } );
  }

  async validate( email: string, password: string ) {
    const user = await this.authService.validateUser( email, password );
    if ( !user ) {
      throw new UnauthorizedException( 'contraseña o password invalido' );
    }
    return user;
  };
}