import { Injectable, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimerService } from '../timer/timer.service';

type ITime = {
  updated: string;
};

type Keys = 'USD' | 'BRL';

type IBPIContent = {
  symbol: string;
  description;
  string;
  rate_float: number;
  rate: string;
};

type IBPI = { [Key in Keys]: IBPIContent };

interface Response {
  time: ITime;
  disclaimer: string;
  bpi: IBPI;
}

type PriceUpdate = {
  timestamp: Date;
  USD: number;
  BRL: number;
};

@Injectable({
  providedIn: 'root',
})
export class BitcoinService implements OnInit, OnChanges {
  currentPrice: Response;
  lastUpdate: Date;

  updateList: Array<PriceUpdate> = [];

  loading: boolean = false;

  constructor(private http: HttpClient, private timerService: TimerService) {}

  update(): void {
    this.loading = true;
    this.http
      .get<Response>('https://api.coindesk.com/v1/bpi/currentprice/BRL.json')
      .subscribe((data) => {
        this.lastUpdate = new Date();
        this.currentPrice = data;
        this.updateList.push({
          timestamp: this.lastUpdate,
          USD: this.currentPrice.bpi.USD.rate_float,
          BRL: this.currentPrice.bpi.BRL.rate_float,
        });
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.timerService.start(1000);
    this.update();
  }

  ngOnChanges(): void {

  }
}
