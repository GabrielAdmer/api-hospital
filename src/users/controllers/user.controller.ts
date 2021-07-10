import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ApiTags } from '@nestjs/swagger';

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
}
