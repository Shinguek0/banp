import BaseEntity from 'src/core/database/domain/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import Answer from './answer.entity';
import User from 'src/modules/user/domain/entities/user.entity';

@Entity({ name: 'categories' })
export default class Category extends BaseEntity {
  @Column({ name: 'name' })
  public name: string;

  @ManyToMany(
    () => Answer,
    (answer) => answer.categories, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'answer_categories',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'answer_id',
      referencedColumnName: 'id',
    },
  })
  public answers: Answer[];

  @ManyToMany(
    () => User,
    (user) => user.profile, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'user_profile',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  public profiles: User[];

  @ManyToMany(
    () => User,
    (user) => user.profile, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'user_desire',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  public desires: User[];
}
