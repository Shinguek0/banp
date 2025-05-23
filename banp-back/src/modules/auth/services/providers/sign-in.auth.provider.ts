import UserRepository from 'src/modules/user/domain/repositories/user.repository';
import SignInDTO from '../../domain/dto/sing-in.dto';
import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export default class SignInAuthProvider {
  public constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async execute(dto: SignInDTO) {
    const user = await this.findUser(dto.email);
    // if (!(await compareCrypt(user.password, dto.password))) {
    //   throw new HttpException('Senha incorreta', 401);
    // }
    const payload = { id: user.id };

    return {
      access_token: await this.jwtService.sign(payload),
    };
  }

  private async findUser(email: string) {
    const user = await this.userRepository.manager.findOne({
      where: {
        email,
      },
      select: {
        email: true,
        id: true,
      },
    });
    if (!user) {
      throw new HttpException('Usuário não encontrado', 404);
    }
    return user;
  }
}
