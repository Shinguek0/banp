import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseRepository from 'src/core/database/domain/repositories/base.repository';
import { Repository } from 'typeorm';
import UserSignup from '../entities/user-signup.entity';

@Injectable()
export default class UserSignupRepository extends BaseRepository<UserSignup> {
  public constructor(
    @InjectRepository(UserSignup)
    public manager: Repository<UserSignup>,
  ) {
    super();
  }
}
