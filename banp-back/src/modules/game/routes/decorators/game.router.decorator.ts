import { applyDecorators } from '@nestjs/common';
import BaseDecorator from 'src/core/routes/base.decorator';

class GameRouterDefinition extends BaseDecorator {
  public constructor() {
    super({ name: 'Game', route: 'game' });
  }

  public base() {
    return applyDecorators(this.controller());
  }
}

const GameRouter = new GameRouterDefinition();

export default GameRouter;
