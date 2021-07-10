import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigType } from '@nestjs/config';
import config from 'src/config';

import { Client } from 'pg';

@Module( {
  imports: [
    TypeOrmModule.forRootAsync( {
      inject: [ config.KEY ],
      useFactory: ( configService: ConfigType<typeof config> ) => {
        // const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          url: configService.postgresUrl,
          synchronize: false,
          autoLoadEntities: true,
          //ssl: { rejectUnauthorized: false }
        };
      },
    } )
  ],
  providers: [
    {
      inject: [ config.KEY ],
      provide: "PG",
      useFactory: ( configService: ConfigType<typeof config> ) => {
        // const { user, host, dbName, password, port } = configService.postgres;
        const client = new Client( {
          connectionString: configService.postgresUrl,
          //ssl: { rejectUnauthorized: false }
        } );
        client.connect();
        return client;
      },
    }
  ],
  exports: [ TypeOrmModule, 'PG' ]
} )
export class DatabaseModule { }
