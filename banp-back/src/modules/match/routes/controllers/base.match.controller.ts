import { Get, Param, Post, Query } from '@nestjs/common';
import RecommendationRouter from '../decorators/recommendation.router.decorator';
import MatchService from '../../services/match.service';
import { AuthUser } from 'src/modules/auth/domain/decorator/auth-user.auth';
import User from 'src/modules/user/domain/entities/user.entity';
import PaginationDTO from 'src/core/dto/pagination.interface';
import { EMatchResponse } from '../../domain/enum/match-response.enum';

@RecommendationRouter.base()
export default class MatchRecommendationController {
  public constructor(private readonly service: MatchService) {}

  @Get('')
  public async index(@AuthUser() user: User, @Query() dto: PaginationDTO) {
    return await this.service.find.execute(user, dto);
  }

  @Post('/:user_id')
  public async find(
    @AuthUser() user: User,
    @Query('response') response: EMatchResponse,
    @Param('user_id') userId: number,
  ) {
    return await this.service.responseMatch.execute(user, userId, response);
  }
}
