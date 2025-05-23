import { Injectable } from '@nestjs/common';
import QuestionRepository from '../domain/repositories/question.repository';
import QuestionService from './providers/question-service/question.service';
import FindUsersByRecommendationProvider from './providers/find-users-by-recomendation.provider';
import UserRepository from 'src/modules/user/domain/repositories/user.repository';
import ResponseMeetingMatchProvider from './providers/response-meeting.match.provider';
import MatchRepository from '../domain/repositories/match.repository';
import FindMatchsByUserProvider from './providers/find-matchs-by-user.provider';

@Injectable()
export default class MatchService {
  public question: QuestionService;
  public findUsers: FindUsersByRecommendationProvider;
  public responseMatch: ResponseMeetingMatchProvider;
  public find: FindMatchsByUserProvider;
  public constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly userRepository: UserRepository,
    private readonly matchRepository: MatchRepository,
  ) {
    this.question = new QuestionService(this.questionRepository);
    this.findUsers = new FindUsersByRecommendationProvider(this.userRepository);
    this.responseMatch = new ResponseMeetingMatchProvider(
      this.matchRepository,
      this.userRepository,
    );
    this.find = new FindMatchsByUserProvider(this.matchRepository);
  }
}
