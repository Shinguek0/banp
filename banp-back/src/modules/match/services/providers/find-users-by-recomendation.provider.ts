import PaginationDTO from 'src/core/dto/pagination.interface';
import User from 'src/modules/user/domain/entities/user.entity';
import UserRepository from 'src/modules/user/domain/repositories/user.repository';
import { In, Not } from 'typeorm';

export default class FindUsersByRecommendationProvider {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute(user: User, dto: PaginationDTO) {
    const usersId = await this.userRepository.manager.find({
      where: {
        profile: {
          id: In(user.desire.map((value) => value.id)),
        },
        id: Not(user.id),
      },
      take: dto.take,
      skip: dto.take * (dto.page - 1),
      relations: ['profile', 'userMatch', 'userMatch.user'],
    });

    const ids = await Promise.all(
      usersId.reduce((prev, current) => {
        if (!current.userMatch.find((value) => value.user.id == user.id)) {
          prev.push(current);
        }
        return prev;
      }, [] as User[]),
    );

    return await this.userRepository.manager.find({
      where: {
        id: In(ids.map((user) => user.id)),
      },
      relations: ['profile', 'games'],
    });
  }
}
