import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class PaginationDTO {
  @ApiProperty()
  @IsNotEmpty()
  public take: number;
  @ApiProperty()
  @IsNotEmpty()
  public page: number;
}
