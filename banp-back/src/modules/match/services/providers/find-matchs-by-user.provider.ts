import User from 'src/modules/user/domain/entities/user.entity';
import MatchRepository from '../../domain/repositories/match.repository';
import PaginationDTO from 'src/core/dto/pagination.interface';

export default class FindMatchsByUserProvider {
  public constructor(private readonly matchRepository: MatchRepository) {}

  public async execute(user: User, dto: PaginationDTO) {
    return await this.matchRepository.manager.find({
      where: {
        user: {
          id: user.id,
        },
      },
      take: dto.take,
      skip: dto.take * (dto.page - 1),
      relations: ['user'],
    });
  }
}
