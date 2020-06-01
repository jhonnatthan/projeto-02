import { BitcoinService } from './../services/bitcoin/bitcoin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
})
export class HistoricoComponent implements OnInit {
  constructor(public bitcoinService: BitcoinService) {}

  ngOnInit(): void {
    this.bitcoinService.update();

    setInterval(() => {
      this.bitcoinService.update();
    }, 60000);
  }
}
