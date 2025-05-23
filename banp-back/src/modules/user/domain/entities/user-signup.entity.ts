import BaseEntity from 'src/core/database/domain/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import User from './user.entity';

@Entity({ name: 'users_signup' })
export default class UserSignup extends BaseEntity {
  @Column({ name: 'firebase_id' })
  public firebaseId: string;

  @OneToOne(() => User, (user) => user.signupCredentials)
  public user: User;
}
