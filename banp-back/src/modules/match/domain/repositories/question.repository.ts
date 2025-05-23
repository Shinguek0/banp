import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseRepository from 'src/core/database/domain/repositories/base.repository';
import { Repository } from 'typeorm';
import Question from '../entities/question.entity';

@Injectable()
export default class QuestionRepository extends BaseRepository<Question> {
  public constructor(
    @InjectRepository(Question)
    public manager: Repository<Question>,
  ) {
    super();
  }
}
