import { applyDecorators } from '@nestjs/common';
import BaseDecorator from 'src/core/routes/base.decorator';

class AuthRouterDefinition extends BaseDecorator {
  public constructor() {
    super({ name: 'Auth', route: 'auth' });
  }

  public base() {
    return applyDecorators(this.controller());
  }
}

const AuthRouter = new AuthRouterDefinition();

export default AuthRouter;
