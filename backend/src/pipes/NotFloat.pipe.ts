import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class NotFloatPipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value !== 'number' || Number.isInteger(value)) {
      console.log(value);
      return value;
    }
    throw new BadRequestException('Invalid input. Expected an integer.');
  }
}
