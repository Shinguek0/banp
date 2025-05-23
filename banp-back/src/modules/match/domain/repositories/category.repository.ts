import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseRepository from 'src/core/database/domain/repositories/base.repository';
import { Repository } from 'typeorm';
import Category from '../entities/category.entity';

@Injectable()
export default class CategoryRepository extends BaseRepository<Category> {
  public constructor(
    @InjectRepository(Category)
    public manager: Repository<Category>,
  ) {
    super();
  }
}
