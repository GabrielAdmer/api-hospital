import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor( private readonly appService: AppService ) { }

  @Get()
  getHello(
    @Req() request: Request, @Res() response: Response
  ) {
    // return this.appService.getHello();

  }

  @Get( 'pruebas' )
  pruebas() {
    return {
      ok: true,
      hola: 'todo bien'
    };
  }
}
