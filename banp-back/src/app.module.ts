import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import DatabaseModule from './core/database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import UserModule from './modules/user/user.module';
import GameModule from './modules/game/game.module';
import MatchModule from './modules/match/match.module';
import AuthModule from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    GameModule,
    MatchModule,
    AuthModule,
  ],
})
export class AppModule {}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
  ],
})
export class CronModule {}
