import { applyDecorators } from '@nestjs/common';
import BaseDecorator from 'src/core/routes/base.decorator';

class RecommendationRouterDefinition extends BaseDecorator {
  public constructor() {
    super({ name: 'Match', route: 'match' });
  }

  public base() {
    return applyDecorators(this.controller(), this.login());
  }

  public recommendation() {
    return applyDecorators(this.controller('recommendation'), this.login());
  }

  public question() {
    return applyDecorators(this.controller('question'));
  }
}

const RecommendationRouter = new RecommendationRouterDefinition();

export default RecommendationRouter;
