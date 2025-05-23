import { Get } from '@nestjs/common';
import GameRouter from '../decorators/game.router.decorator';
import GameService from '../../services/game.service';

@GameRouter.base()
export default class BaseGameController {
  public constructor(private readonly service: GameService) {}

  @Get('')
  public async find() {
    return await this.service.findAll.execute();
  }
}
