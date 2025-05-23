import BaseEntity from 'src/core/database/domain/entities/base.entity';
import User from 'src/modules/user/domain/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EMatchResponse } from '../enum/match-response.enum';

@Entity({ name: 'matches' })
export default class Match extends BaseEntity {
  @ManyToOne(() => User, (user) => user.userMatch)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => User, (user) => user.userMeetingMatch)
  @JoinColumn({ name: 'user_meeting_id' })
  public userMeeting: User;

  @Column({ name: 'response', enum: EMatchResponse })
  public response: EMatchResponse;
}
