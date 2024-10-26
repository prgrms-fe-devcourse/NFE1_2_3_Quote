import { PickType } from '@nestjs/swagger';
import { Comments } from '../schemas/comments.schema';

export class CommentsCreateDto extends PickType(Comments, [
  'contents',
] as const) {}
