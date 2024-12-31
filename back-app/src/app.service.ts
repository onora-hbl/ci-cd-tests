import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  counter = 0;

  getCount(): number {
    return this.counter;
  }

  increment(): void {
    this.counter++;
  }
}
