import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupUserGamesDTO {
  @ApiProperty({ name: 'game_id' })
  @Expose({ name: 'game_id' })
  public gameId: number;
}

export class SignupUserQuestionDTO {
  @ApiProperty({ name: 'answer_id' })
  @Expose({ name: 'answer_id' })
  public answerId: number;
}

export default class SignupUserDTO {
  @ApiProperty({ name: 'name' })
  @Expose({ name: 'name' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ name: 'discord' })
  @Expose({ name: 'discord' })
  @IsString()
  @IsNotEmpty()
  public discord: string;

  @ApiProperty({ name: 'gender' })
  public gender: string;

  @ApiProperty({ name: 'image' })
  public image: string;

  @ApiProperty({ name: 'email' })
  @Expose({ name: 'email' })
  @IsString()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ name: 'birth_date' })
  @Expose({ name: 'birth_date' })
  @IsString()
  @IsNotEmpty()
  public birthDate: string;

  @ApiProperty({ name: 'games', isArray: true, type: SignupUserGamesDTO })
  @Expose({ name: 'games' })
  public games: SignupUserGamesDTO[];

  @ApiProperty({
    name: 'questions',
    isArray: true,
    type: SignupUserQuestionDTO,
  })
  @Expose({ name: 'questions' })
  public questions: SignupUserQuestionDTO[];
}
