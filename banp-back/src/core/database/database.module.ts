import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import NeoConnection from './domain/connection/neo.connection';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const connection = new NeoConnection(config);
        return connection.getConnection();
      },
    }),
  ],
})
export default class DatabaseModule {}
