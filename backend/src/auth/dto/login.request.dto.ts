import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.schema';

export class LoginRequestDto extends PickType(User, [
  'email',
  'password',
] as const) {}
