import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigType } from '@nestjs/config';
import config from 'src/config';

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
  exports: [ TypeOrmModule ]
} )
export class DatabaseModule { }
