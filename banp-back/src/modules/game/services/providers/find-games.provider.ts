import GameRepository from '../../domain/repositories/game.repository';

export default class FindGamesProvider {
  public constructor(private readonly gameRepository: GameRepository) {}

  public async execute() {
    return await this.gameRepository.manager.find();
  }
}
