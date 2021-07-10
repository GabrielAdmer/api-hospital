import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create( AppModule );

  /**para probir tener campos que no son requeridos y mandar un advertencia */
  app.useGlobalPipes( new ValidationPipe( {
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true //parametros a numero
    }
  } ) );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle( 'API' )
    .setDescription( 'TIENDITA MABEL' )
    .setVersion( '1.0' )
    .build();
  const document = SwaggerModule.createDocument( app, config );
  SwaggerModule.setup( 'docs', app, document );

  await app.listen( 3000 );
}
bootstrap();
