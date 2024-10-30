import { PickType } from '@nestjs/swagger';
import { Comments } from '../schemas/comments.schema';

export class CommentsResponseDto extends Comments {}
