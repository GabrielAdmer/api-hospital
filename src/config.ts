import { registerAs } from '@nestjs/config';

export default registerAs( 'config', () => {

  return {

    database: {
      name: process.env.DATABASE_NAME
    },

    postgresUrl: process.env.DATABASE_URL,

    jwtScrete: process.env.JWT_SECRET

  };
} );