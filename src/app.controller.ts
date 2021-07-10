import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { request, Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor( private readonly appService: AppService ) { }

  // @Get( ':id' )
  // getHello(
  //   @Req() request: Request, @Res() response: Response
  //   //@Body() data: any
  // ) {
  //   const id = request.params.id;
  //   return id;
  // }

  // @Get( 'pruebas' )
  // pruebas() {
  //   return {
  //     ok: true,
  //     hola: 'todo bien'
  //   };
  // }


}
