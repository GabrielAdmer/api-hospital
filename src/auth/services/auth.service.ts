import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '../../../dist/auth/models/pyload-token.interface';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { };

  async validateUser( email: string, password: string ) {
    const user = await this.userService.findByEmail( email );
    if ( user ) {
      const isMatch = await bcrypt.compare( password, user.password );
      if ( isMatch ) {
        return user;
      }
      return null;
    }
  }

  async generarJwt( user: User ) {
    const payload: PayloadToken = { rol: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign( payload ),
    };
  }

}
