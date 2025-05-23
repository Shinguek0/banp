import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseRepository from 'src/core/database/domain/repositories/base.repository';
import { Repository } from 'typeorm';
import Game from '../entities/game.entity';

@Injectable()
export default class GameRepository extends BaseRepository<Game> {
  public constructor(
    @InjectRepository(Game)
    public manager: Repository<Game>,
  ) {
    super();
  }
}
