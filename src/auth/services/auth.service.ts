import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService
  ) { };

  async validateUser( email: string, password: string ) {
    const user = await this.userService.findByEmail( email );

  }

}
