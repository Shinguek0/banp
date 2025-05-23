import QuestionRepository from 'src/modules/match/domain/repositories/question.repository';
import FindQuestionRecommendationProvider from './providers/find-questions.question.recommendation.provider';

export default class QuestionService {
  public find: FindQuestionRecommendationProvider;
  public constructor(private readonly questionRepository: QuestionRepository) {
    this.find = new FindQuestionRecommendationProvider(this.questionRepository);
  }
}
