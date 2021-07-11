import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { Request } from 'express';
import { PayloadToken } from 'src/auth/models/payloadToken.interface';

@UseGuards( JwtAuthGuard )
@ApiTags( 'Users' )
@Controller( 'users' )
export class UserController {

  constructor(
    private userService: UserService
  ) { }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return { users };
  };

  @IsPublic()
  @Get( ':id' )
  async findOne(
    @Param( 'id', ParseIntPipe ) id: number
  ) {
    const user = await this.userService.findOne( id );
    return { user };
  };

  @Post()
  async createOne(
    @Body() data: CreateUserDto
  ) {
    const user = await this.userService.createOne( data );
    return { user };
  };

  @Put( ':id' )
  async updateOne(
    @Body() changes: UpdateUserDto, @Param( 'id', ParseIntPipe ) id: number
  ) {
    const user = await this.userService.updateOne( id, changes );
    return { user };
  };

  @Delete( ':id' )
  removeOne(
    @Param( 'id', ParseIntPipe ) id: number
  ) {
    return this.userService.removeOne( id );
  };

  @Get( 'pedidos/todo' )
  pedidos(
    @Req() req: Request
  ) {
    const id = req.user as PayloadToken;
    return {
      id: id.sub
    };
  }
}
