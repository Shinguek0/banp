import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export default class PreSignupDTO {
  @ApiProperty({ name: 'firebase_id' })
  @Expose({ name: 'firebase_id' })
  @IsString()
  @IsNotEmpty()
  public firebaseId: string;
}
