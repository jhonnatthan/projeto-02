import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timer: any;

  public counter = 0;

  constructor() {}

  start(ms: number) {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.counter++;
      }, ms);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  getCount() {
    return this.counter;
  }
}
