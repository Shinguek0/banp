import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseRepository from 'src/core/database/domain/repositories/base.repository';
import { Repository } from 'typeorm';
import Answer from '../entities/answer.entity';

@Injectable()
export default class AnswerRepository extends BaseRepository<Answer> {
  public constructor(
    @InjectRepository(Answer)
    public manager: Repository<Answer>,
  ) {
    super();
  }
}
