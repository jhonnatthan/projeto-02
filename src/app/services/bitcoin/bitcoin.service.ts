import { StorageService } from './../storage/storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

export type BitcoinResponse = {
  time: ITime;
  disclaimer: string;
  bpi: IBPI;
};

type PriceUpdate = {
  timestamp: Date;
  USD: number;
  BRL: number;
};

type UpdateCallback = {
  currentPrice: BitcoinResponse;
  lastUpdate: Date;
  updateList: Array<PriceUpdate>;
};
@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  currentPrice: BitcoinResponse;
  lastUpdate: Date;

  updateList: Array<PriceUpdate> = [];

  loading = false;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {
    this.updateList = this.storageService.get('@bitcoin:list') ?? [];
  }

  public update(callback?: (props: UpdateCallback) => void): void {
    this.loading = true;
    this.http
      .get<BitcoinResponse>(
        'https://api.coindesk.com/v1/bpi/currentprice/BRL.json'
      )
      .subscribe((data) => {
        this.lastUpdate = new Date();
        this.currentPrice = data;
        this.updateList.unshift({
          timestamp: this.lastUpdate,
          USD: this.currentPrice.bpi.USD.rate_float,
          BRL: this.currentPrice.bpi.BRL.rate_float,
        });

        this.storageService.set('@bitcoin:list', this.updateList);
        this.loading = false;

        callback({
          currentPrice: this.currentPrice,
          updateList: this.updateList,
          lastUpdate: this.lastUpdate,
        });
      });
  }

  public getRateFloat(location: Keys = 'BRL') {
    return this.currentPrice.bpi[location].rate_float;
  }
}
