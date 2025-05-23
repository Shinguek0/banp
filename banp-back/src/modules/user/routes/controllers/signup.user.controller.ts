import { Body, Get, Param, Post } from '@nestjs/common';
import UserService from '../../services/user.service';
import UserRouter from '../decorators/user.router.decorator';
import PreSignupDTO from '../../domain/dto/pre-signup.user.dto';
import { plainToInstance } from 'class-transformer';
import SignupUserDTO, {
  SignupUserGamesDTO,
  SignupUserQuestionDTO,
} from '../../domain/dto/signup-user.dto';

@UserRouter.signup()
export default class SignupUserController {
  public constructor(private readonly service: UserService) {}

  @Post('')
  public async preSignup(@Body() dto: PreSignupDTO) {
    const body = plainToInstance(PreSignupDTO, dto);
    return await this.service.preSignup.execute(body.firebaseId);
  }

  @Post('/:hash')
  public async signup(@Body() dto: SignupUserDTO, @Param('hash') hash: string) {
    const body = plainToInstance(SignupUserDTO, dto);
    body.games = plainToInstance(SignupUserGamesDTO, body.games);
    body.questions = plainToInstance(SignupUserQuestionDTO, body.questions);
    return await this.service.signup.execute(hash, body);
  }

  @Get('/:hash')
  public async validateSignup(@Param('hash') hash: string) {
    return await this.service.validateSignup.execute(hash);
  }
}
