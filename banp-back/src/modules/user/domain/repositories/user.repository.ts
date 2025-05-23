import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseRepository from 'src/core/database/domain/repositories/base.repository';
import User from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class UserRepository extends BaseRepository<User> {
  public constructor(
    @InjectRepository(User)
    public manager: Repository<User>,
  ) {
    super();
  }
}
