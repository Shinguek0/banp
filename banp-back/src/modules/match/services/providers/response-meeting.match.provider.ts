import User from 'src/modules/user/domain/entities/user.entity';
import MatchRepository from '../../domain/repositories/match.repository';
import { EMatchResponse } from '../../domain/enum/match-response.enum';
import UserRepository from 'src/modules/user/domain/repositories/user.repository';
import { HttpException } from '@nestjs/common';

export default class ResponseMeetingMatchProvider {
  public constructor(
    private readonly matchRepository: MatchRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(
    userLogged: User,
    userIdMeeting: number,
    response: EMatchResponse,
  ) {
    const userMeeting = await this.userRepository.manager.findOne({
      where: {
        id: userIdMeeting,
      },
    });
    if (!userMeeting) {
      throw new HttpException('Usuário não encontrado', 404);
    }
    const meet = await this.findAnotherMeeting(userLogged.id, userIdMeeting);

    await this.matchRepository.manager.save({
      user: userLogged,
      userMeeting: userMeeting,
      response,
    });

    if (meet && response == EMatchResponse.LIKE) {
      if (meet.response == EMatchResponse.LIKE) {
        return {
          is_match: true,
        };
      }
    }

    return { is_match: false };
  }

  private async findAnotherMeeting(userId: number, userIdMeeting: number) {
    return await this.matchRepository.manager.findOne({
      where: {
        user: {
          id: userId,
        },
        userMeeting: {
          id: userIdMeeting,
        },
      },
      relations: [],
    });
  }
}
