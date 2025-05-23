import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Question from './domain/entities/question.entity';
import QuestionRepository from './domain/repositories/question.repository';
import Answer from './domain/entities/answer.entity';
import AnswerRepository from './domain/repositories/answer.repository';
import Category from './domain/entities/category.entity';
import CategoryRepository from './domain/repositories/category.repository';
import MatchService from './services/match.service';
import QuestionRecommendationController from './routes/controllers/question.recommendation.controller';
import BaseRecommendationController from './routes/controllers/recommendation.recommendation.controller';
import Match from './domain/entities/match.entity';
import MatchRepository from './domain/repositories/match.repository';
import MatchRecommendationController from './routes/controllers/base.match.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer, Category, Match])],
  providers: [
    QuestionRepository,
    AnswerRepository,
    CategoryRepository,
    MatchRepository,
    MatchService,
  ],
  controllers: [
    QuestionRecommendationController,
    BaseRecommendationController,
    MatchRecommendationController,
  ],
  exports: [CategoryRepository, AnswerRepository],
})
export default class MatchModule {}
