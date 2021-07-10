import { Inject, Injectable } from '@nestjs/common';

import { Client, Connection } from 'pg';

@Injectable()
export class AppService {

  constructor(
    @Inject( 'PG' ) private clientePg: Client
  ) { }

  getHello() {
    return new Promise( ( resolve, reject ) => {
      this.clientePg.query( 'SELECT * FROM tasks', ( err, res ) => {
        if ( err ) {
          reject( err );
        }
        resolve( res.rows );
      } );
    } );
  }
}
