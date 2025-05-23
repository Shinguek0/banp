import { HttpException } from '@nestjs/common';
import UserSignupRepository from '../../domain/repositories/user-signup.repository';

export default class ValidateSignupUserProvider {
  public constructor(
    private readonly userSignupRepository: UserSignupRepository,
  ) {}

  public async execute(firebaseId: string) {
    const userSignup = await this.findUserWithThisFirebaseId(firebaseId);

    return {
      have_account: !!userSignup.user,
    };
  }

  private async findUserWithThisFirebaseId(id: string) {
    const userSignup = await this.userSignupRepository.manager.findOne({
      where: { firebaseId: id },
      relations: {
        user: true,
      },
    });
    if (!userSignup) {
      throw new HttpException(
        'Este código não foi cadastrado ainda em nosso sistema',
        404,
      );
    }

    return userSignup;
  }
}
