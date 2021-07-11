import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository( User ) private userRepo: Repository<User>
  ) { }

  findAll() {
    console.log( 'hoala' );
    return this.userRepo.find();
    //return this.userRepo.find( { select: [ 'email', 'google' ], where: { name: 'mabel' } } );
    // return this.userRepo.createQueryBuilder().select(
    //   [ "user.google", "user.name" ]
    // ).from( User, 'user' ).where( { name: 'mabel' } ).getMany();
  }

  async findOne( id: number ) {

    const user = await this.userRepo.findOne( { id: id }, { relations: [ 'hospitales' ] } );
    if ( !user ) {
      throw new NotFoundException( `Id #${id} no encontrado` );
    }
    return user;
  };

  async createOne( data: CreateUserDto ) {
    const user = this.userRepo.create( data );

    const email = await this.userRepo.findOne( { email: data.email } );
    console.log( email );
    if ( email ) {
      throw new BadRequestException( `El correo ya esta registrado` );
    }

    //**** Crenado password incryptado**/
    const hasPassword = await bcrypt.hash( user.password, 2 );
    user.password = hasPassword;
    return this.userRepo.save( user );
  };

  async updateOne( id: number, changes: UpdateUserDto ) {
    const user = await this.userRepo.findOne( id );

    if ( !user ) {
      throw new BadRequestException( 'El usuario no existe' );
    }


    const email = await this.userRepo.findOne( { email: changes.email } );
    console.log( email );
    if ( email ) {
      throw new BadRequestException( `El correo ya esta registrado` );
    }


    this.userRepo.merge( user, changes );
    return this.userRepo.save( user );

  };

  removeOne( id: number ) {
    return this.userRepo.delete( id );
  };

  //**** Buscar por email **/

  findByEmail( email: string ) {
    return this.userRepo.findOne( { where: { email: email } } );
  }

}
