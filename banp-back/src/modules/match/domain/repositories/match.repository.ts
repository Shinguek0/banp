import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseRepository from 'src/core/database/domain/repositories/base.repository';
import { Repository } from 'typeorm';
import Match from '../entities/match.entity';

@Injectable()
export default class MatchRepository extends BaseRepository<Match> {
  public constructor(
    @InjectRepository(Match)
    public manager: Repository<Match>,
  ) {
    super();
  }
}
