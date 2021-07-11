import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import config from './config';
import { enviroments } from './enviroments';
import { DatabaseModule } from './database/database.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HopitalesModule } from './hospitales/hospitales.module';

@Module( {
  imports: [
    ConfigModule.forRoot( {
      envFilePath: enviroments[ process.env.NODE_ENV ] || '.env',
      load: [ config ],
      isGlobal: true
    } ),
    DatabaseModule,
    UsersModule,
    AuthModule,
    HopitalesModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
} )
export class AppModule { }
