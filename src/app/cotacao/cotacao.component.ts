import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../services/bitcoin/bitcoin.service';
import { TimerService } from '../services/timer/timer.service';

@Component({
  selector: 'app-cotacao',
  templateUrl: './cotacao.component.html',
  styleUrls: ['./cotacao.component.css'],
})
export class CotacaoComponent implements OnInit {
  value = '50';

  options: object = { prefix: 'R$ ', thousands: '.', decimal: ',' };

  rateFloat: number;

  constructor(
    public bitcoinService: BitcoinService,
    public timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.timerService.start(1000, 60);
    this.bitcoinService.update();

    setInterval(() => {
      this.bitcoinService.update();
    }, 60000);
  }

  getBitcoinByValue() {
    const inputValue = parseFloat(this.value);
    const bitcoinValue =
      (inputValue * 1) / this.bitcoinService.getBrlRateFloat();
    return bitcoinValue;
  }
}
