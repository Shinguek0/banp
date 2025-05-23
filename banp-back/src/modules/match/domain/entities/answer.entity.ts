import BaseEntity from 'src/core/database/domain/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import Question from './question.entity';
import Category from './category.entity';

@Entity({ name: 'answers' })
export default class Answer extends BaseEntity {
  @Column({ name: 'title' })
  public title: string;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToMany(
    () => Category,
    (category) => category.answers, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'answer_categories',
    joinColumn: {
      name: 'answer_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  public categories: Category[];
}
