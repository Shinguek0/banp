import { Injectable } from '@nestjs/common';
import PreSignupUserProvider from './providers/pre-signup.user.provider';
import UserSignupRepository from '../domain/repositories/user-signup.repository';
import ValidateSignupUserProvider from './providers/validate-signup.user.provider';
import SignupUserProvider from './providers/signup.user.provider';
import UserRepository from '../domain/repositories/user.repository';
import GameRepository from 'src/modules/game/domain/repositories/game.repository';
import AnswerRepository from 'src/modules/match/domain/repositories/answer.repository';

@Injectable()
export default class UserService {
  public preSignup: PreSignupUserProvider;
  public validateSignup: ValidateSignupUserProvider;
  public signup: SignupUserProvider;
  public constructor(
    private readonly userSignupRepository: UserSignupRepository,
    private readonly userRepository: UserRepository,
    private readonly gameRepository: GameRepository,
    private readonly answerRepository: AnswerRepository,
  ) {
    this.preSignup = new PreSignupUserProvider(this.userSignupRepository);
    this.validateSignup = new ValidateSignupUserProvider(
      this.userSignupRepository,
    );
    this.signup = new SignupUserProvider(
      this.userSignupRepository,
      this.userRepository,
      this.gameRepository,
      this.answerRepository,
    );
  }
}
