import { HttpException } from '@nestjs/common';
import UserSignupRepository from '../../domain/repositories/user-signup.repository';
import UserSignup from '../../domain/entities/user-signup.entity';

export default class PreSignupUserProvider {
  public constructor(
    private readonly userSignupRepository: UserSignupRepository,
  ) {}

  public async execute(firebaseId: string) {
    await this.findUserWithThisFirebaseId(firebaseId);

    return this.save(firebaseId);
  }

  private async findUserWithThisFirebaseId(id: string) {
    const userSignup = await this.userSignupRepository.manager.findOne({
      where: { firebaseId: id },
    });
    if (userSignup) {
      throw new HttpException(
        'Este código de cadastro já está sendo utilizado',
        409,
      );
    }
  }

  private async save(id: string) {
    const signup = new UserSignup();
    signup.firebaseId = id;
    return await this.userSignupRepository.manager.save(signup);
  }
}
