import BaseEntity from 'src/core/database/domain/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import Answer from './answer.entity';

@Entity({ name: 'questions' })
export default class Question extends BaseEntity {
  @Column({ name: 'title' })
  public title: string;

  @OneToMany(() => Answer, (photo) => photo.question)
  answers: Answer[];
}
