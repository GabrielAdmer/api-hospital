import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from '../entities/hospital.entity';
import { CreateHospitalDto, UpdateHospitalDto } from '../dtos/hospital.dto';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class HospitalService {

  constructor(
    @InjectRepository( Hospital ) private hospitalRepo: Repository<Hospital>,
    @InjectRepository( User ) private userRepo: Repository<User>,
  ) { }

  findAll() {
    return this.hospitalRepo.find( { relations: [ 'user' ] } );
  };

  async findOne( id: number ) {
    const user = this.hospitalRepo.findOne( id );
    if ( !user ) {
      throw new NotFoundException( `Id #${id} no encontrado` );
    }
    return user;
  };

  async createOne( data: CreateHospitalDto ) {
    const newHospital = this.hospitalRepo.create( data );

    if ( data.userId ) {
      const usuario = await this.userRepo.findOne( data.userId );
      newHospital.user = usuario;
    } else {
      throw new UnauthorizedException( 'no esta autorizado' );
    }
    return this.hospitalRepo.save( newHospital );
  };

  async updateOne( id: number, changes: UpdateHospitalDto ) {

    const hospital = await this.hospitalRepo.findOne( id );
    this.hospitalRepo.merge( hospital, changes );
    return this.hospitalRepo.save( hospital );


  };

  removeOne( id: number ) {
    return this.hospitalRepo.delete( id );
  };

}
