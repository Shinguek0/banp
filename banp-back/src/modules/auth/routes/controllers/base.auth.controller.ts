import { Body, Param, Post } from '@nestjs/common';
import AuthRouter from '../decorators/auth.router.decorator';
import SignInDTO from '../../domain/dto/sing-in.dto';
import AuthService from '../../services/auth.service';

@AuthRouter.base()
export default class BaseAuthController {
  public constructor(private readonly service: AuthService) {}

  @Post('')
  public async preSignup(@Body() dto: SignInDTO) {
    return await this.service.signIn.execute(dto);
  }

  @Post('refresh/:token')
  public async refresh(@Param('token') token: string) {
    return await this.service.refresh.execute(token);
  }
}
