import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { EConnection } from '../enum/connection.enum';
import { DataSourceOptions } from 'typeorm';

import IConnection from '../interfaces/connection.interface';

export default class Connection {
  private host: string;
  private port: number;
  private database: string;
  private userName: string;
  private password: string;
  private type: 'postgres' | 'mssql';
  private migration: string;
  public constructor(
    connection: EConnection,
    private readonly configService?: ConfigService,
    private readonly enviromentNameDatabase?: string,
    private readonly anotherFolderMigration?: string,
    private readonly suffixEntity?: string,
  ) {
    this.host = configService
      ? this.configService.get(Connection.getEnv(connection, 'host'))
      : process.env[Connection.getEnv(connection, 'host')];
    this.port = configService
      ? parseInt(this.configService.get(Connection.getEnv(connection, 'port')))
      : parseInt(process.env[Connection.getEnv(connection, 'port')]);
    this.database = configService
      ? this.configService.get(
          this.enviromentNameDatabase ??
            Connection.getEnv(connection, 'database'),
        )
      : process.env[
          this.enviromentNameDatabase ??
            Connection.getEnv(connection, 'database')
        ];
    this.userName = configService
      ? this.configService.get(Connection.getEnv(connection, 'user'))
      : process.env[Connection.getEnv(connection, 'user')];
    this.password = configService
      ? this.configService.get(Connection.getEnv(connection, 'pass'))
      : process.env[Connection.getEnv(connection, 'pass')];
    this.migration = `../../migration/${connection}/*.ts`;
    this.type = connection;
  }

  public getConnection(
    connectionVars?: IConnection,
  ): TypeOrmModuleOptions | DataSourceOptions {
    const runningSeeds = process.env.RUNNING_SEED === 'true';

    const connection = {
      type: this.type ?? connectionVars.type,
      host: this.host ?? connectionVars.host,
      port: `${this.port}` == ` NaN` ? connectionVars.port : this.port,
      database: this.database ?? connectionVars.database,
      username: this.userName ?? connectionVars.username,
      password: this.password ?? connectionVars.password,
      autoLoadEntities: true,
      migrationsTableName: 'migrations_typeorm',
      entities: runningSeeds
        ? this.suffixEntity
          ? [`src/**/*.entity-${this.suffixEntity}{.ts,.js}`]
          : ['src/**/*.entity{.ts,.js}']
        : this.suffixEntity
          ? [`dist/**/*.entity-${this.suffixEntity}{.ts,.js}`]
          : ['dist/**/*.entity{.ts,.js}'],
      migrations: this.anotherFolderMigration
        ? [
            `dist/core/database/migrations/${this.anotherFolderMigration}/*{.js,.ts}`,
          ]
        : ['dist/core/database/migrations/*{.js,.ts}'],
      synchronize: false,
    };

    if (this.type == 'mssql') {
      connection['extra'] = {
        trustServerCertificate: true,
      };
    } else {
      connection['extra'] = {
        rejectUnauthorized: false,
      };
    }

    return connection;
  }

  private static getEnv(connection: EConnection, variable: string) {
    return `${variable.toUpperCase()}_${connection.toUpperCase()}`;
  }
}
