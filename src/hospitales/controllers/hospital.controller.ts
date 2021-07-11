import { Body, Controller, Get, Param, Post, Req, UseGuards, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { HospitalService } from '../services/hospital.service';
import { CreateHospitalDto, UpdateHospitalDto } from '../dtos/hospital.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PayloadToken } from 'src/auth/models/payloadToken.interface';

@UseGuards( JwtAuthGuard )
@Controller( 'hospital' )
export class HospitalController {

  constructor(
    private hospitalService: HospitalService
  ) { }

  @Get()
  findAll() {
    return this.hospitalService.findAll();
  };

  @Get( ':id' )
  findOne(
    @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.hospitalService.findOne( id );
  };

  @Post()
  createOne(
    @Req() req: Request, @Body() data: CreateHospitalDto
  ) {
    const payload = req.user as PayloadToken;
    data.userId = payload.sub;
    return this.hospitalService.createOne( data );
  };

  @Put( ':id' )
  updateOne(
    @Param( 'id', ParseIntPipe ) id: number, @Body() changes: UpdateHospitalDto
  ) {
    return this.hospitalService.updateOne( id, changes );
  };

  @Delete( ':id' )
  removeOne(
    @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.hospitalService.removeOne( id );
  };

}
