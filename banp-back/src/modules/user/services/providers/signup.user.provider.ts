import { HttpException } from '@nestjs/common';
import SignupUserDTO from '../../domain/dto/signup-user.dto';
import UserSignupRepository from '../../domain/repositories/user-signup.repository';
import UserRepository from '../../domain/repositories/user.repository';
import GameRepository from 'src/modules/game/domain/repositories/game.repository';
import { In } from 'typeorm';
import AnswerRepository from 'src/modules/match/domain/repositories/answer.repository';
import Category from 'src/modules/match/domain/entities/category.entity';
import UserSignup from '../../domain/entities/user-signup.entity';
import Game from 'src/modules/game/domain/entities/game.entity';
import User from '../../domain/entities/user.entity';
import crypt from 'src/core/utils/crypt';

export default class SignupUserProvider {
  public constructor(
    private readonly userSignupRepository: UserSignupRepository,
    private readonly userRepository: UserRepository,
    private readonly gameRepository: GameRepository,
    private readonly answerRepository: AnswerRepository,
  ) {}

  public async execute(firebaseId: string, dto: SignupUserDTO) {
    const userSignup = await this.findPreSignup(firebaseId);
    const games = await this.findGames(dto);
    const categories = await this.findCategories(dto);

    return await this.save(userSignup, games, categories, dto);
  }

  private async findPreSignup(firebaseId: string) {
    const userSignup = await this.userSignupRepository.manager.findOne({
      where: { firebaseId },
    });
    if (!userSignup) {
      throw new HttpException('Pré Cadastro não encontrado', 404);
    }
    return userSignup;
  }

  private async findGames(dto: SignupUserDTO) {
    const games = await this.gameRepository.manager.find({
      where: {
        id: In(dto.games.map((game) => game.gameId)),
      },
    });

    if (!games || !games.length || games.length != dto.games.length) {
      console.log(dto.games);
      throw new HttpException(
        'Os jogos selecionados não foram encontrados',
        404,
      );
    }
    return games;
  }

  private async findCategories(dto: SignupUserDTO) {
    const answers = await this.answerRepository.manager.find({
      where: {
        id: In(dto.questions.map((question) => question.answerId)),
      },
      relations: ['categories'],
    });
    if (!answers || !answers.length || answers.length != dto.questions.length) {
      throw new HttpException(
        'As perguntas respondidas não foram encontradas',
        404,
      );
    }
    const categoriesOfAllAnswers = answers.map((answer) => answer.categories);

    const categoriesDuplicated = categoriesOfAllAnswers.reduce(
      (prev, current) => {
        prev.push(...current);
        return prev;
      },
      [] as Category[],
    );

    return categoriesDuplicated.reduce((prev, current) => {
      if (!prev.find((category) => category.id == current.id)) {
        prev.push(current);
      }
      return prev;
    }, [] as Category[]);
  }

  private async save(
    userSignup: UserSignup,
    games: Game[],
    categories: Category[],
    dto: SignupUserDTO,
  ) {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.image = dto.image;
    user.discord = dto.discord;
    user.gender = dto.gender as 'M' | 'F';
    user.birthDate = new Date(dto.birthDate);
    user.password = await crypt('batata');
    user.signupCredentials = userSignup;
    user.games = games;
    user.profile = categories;
    user.desire = categories;

    return await this.userRepository.manager.save(user);
  }
}
