import { Inject, Injectable } from '@nestjs/common';

import { Client, Connection } from 'pg';

@Injectable()
export class AppService {

  constructor(
    @Inject( 'PG' ) private db: Client
  ) { }

  getHello() {
    this.db.query( 'SELECT * FROM tasks', ( err, res ) => {
      console.error( err );
      console.log( res.rows );
    } );
  }
}
