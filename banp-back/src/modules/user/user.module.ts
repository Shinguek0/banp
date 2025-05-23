import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './domain/entities/user.entity';
import UserRepository from './domain/repositories/user.repository';
import UserSignup from './domain/entities/user-signup.entity';
import UserSignupRepository from './domain/repositories/user-signup.repository';
import UserService from './services/user.service';
import SignupUserController from './routes/controllers/signup.user.controller';
import GameModule from '../game/game.module';
import MatchModule from '../match/match.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserSignup]),
    GameModule,
    MatchModule,
  ],
  providers: [UserRepository, UserSignupRepository, UserService],
  controllers: [SignupUserController],
  exports: [UserService, UserRepository],
})
export default class UserModule {}
