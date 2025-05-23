import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class SignInDTO {
  @ApiProperty({ name: 'email' })
  @IsString()
  @IsNotEmpty()
  public email: string;
}
