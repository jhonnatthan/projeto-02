import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../services/bitcoin/bitcoin.service';
import { TimerService } from '../services/timer/timer.service';

@Component({
  selector: 'app-cotacao',
  templateUrl: './cotacao.component.html',
  styleUrls: ['./cotacao.component.css'],
})
export class CotacaoComponent implements OnInit {
  constructor(
    public bitcoinService: BitcoinService,
    public timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.timerService.start(1000);
    this.bitcoinService.update();
  }
}
