import { Injectable } from '@nestjs/common';
import FindGamesProvider from './providers/find-games.provider';
import GameRepository from '../domain/repositories/game.repository';

@Injectable()
export default class GameService {
  public findAll: FindGamesProvider;
  public constructor(private readonly gameRepository: GameRepository) {
    this.findAll = new FindGamesProvider(this.gameRepository);
  }
}
