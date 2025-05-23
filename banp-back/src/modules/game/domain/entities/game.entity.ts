import BaseEntity from 'src/core/database/domain/entities/base.entity';
import User from 'src/modules/user/domain/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'games' })
export default class Game extends BaseEntity {
  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'image' })
  public image: string;

  @ManyToMany(
    () => User,
    (user) => user.games, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinTable({
    name: 'user_games',
    joinColumn: {
      name: 'game_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  public users: User[];
}
