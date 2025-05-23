import { Get } from '@nestjs/common';
import RecommendationRouter from '../decorators/recommendation.router.decorator';
import MatchService from '../../services/match.service';

@RecommendationRouter.question()
export default class QuestionRecommendationController {
  public constructor(private readonly service: MatchService) {}

  @Get('')
  public async find() {
    return await this.service.question.find.execute();
  }
}
