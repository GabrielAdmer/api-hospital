import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hospital } from './entities/hospital.entity';
import { HospitalService } from './services/hospital.service';
import { HospitalController } from './controllers/hospital.controller';
import { UsersModule } from '../users/users.module';

@Module( {
  imports: [ TypeOrmModule.forFeature( [ Hospital ] ), UsersModule ],
  providers: [ HospitalService ],
  controllers: [ HospitalController ]
} )
export class HopitalesModule { }
