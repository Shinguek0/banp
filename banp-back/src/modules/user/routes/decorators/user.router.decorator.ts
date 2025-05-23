import { applyDecorators } from '@nestjs/common';
import BaseDecorator from 'src/core/routes/base.decorator';

class UserRouterDefinition extends BaseDecorator {
  public constructor() {
    super({ name: 'User', route: 'user' });
  }

  public base() {
    return applyDecorators(this.controller());
  }

  public signup() {
    return applyDecorators(this.controller('signup'));
  }
}

const UserRouter = new UserRouterDefinition();

export default UserRouter;
