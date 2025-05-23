import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Game from './domain/entities/game.entity';
import GameRepository from './domain/repositories/game.repository';
import GameService from './services/game.service';
import BaseGameController from './routes/controllers/base.game.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GameRepository, GameService],
  controllers: [BaseGameController],
  exports: [GameRepository],
})
export default class GameModule {}
