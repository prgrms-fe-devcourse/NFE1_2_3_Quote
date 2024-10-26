import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginResponseDto {
  @IsString()
  @ApiProperty({ type: String, description: 'jwt tokens' })
  bearerToken: string;
}
