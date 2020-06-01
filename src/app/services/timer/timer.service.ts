import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timer: any;

  public counter = 0;
  public pastedTimes = 0;

  constructor() {}

  start(ms: number, resetOn?: number) {
    if (!this.timer) {
      this.timer = setInterval(() => {
        if (resetOn) {
          if (this.counter === resetOn - 1) {
            this.counter = 0;
            this.pastedTimes++;
          } else {
            this.counter++;
          }
        } else {
          this.counter++;
        }
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
