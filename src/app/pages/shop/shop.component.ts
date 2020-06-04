import { ToastrService } from 'ngx-toastr';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  money = null;
  btc = null;

  constructor(
    private authService: AuthService,
    private bitcoinService: BitcoinService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.updateCurrency();
  }

  public updateCurrency() {
    this.bitcoinService.update(() => {
      this.toastr.success('Cotação atualizada!');
    });
  }

  public moneyToBtc() {
    let bitcoinValue = 0;
    let inputValue = 0;
    if (this.bitcoinService.currentPrice) {
      if (this.money !== null) {
        inputValue = parseFloat(this.money);
        if (inputValue >= 100) {
          bitcoinValue = (inputValue * 1) / this.bitcoinService.getRateFloat();
        }
      }
    }
    return bitcoinValue;
  }

  public btcToMoney() {
    let moneyValue = 0;
    let inputValue = 0;

    if (this.bitcoinService.currentPrice) {
      console.log(this.btc)
      if (this.btc !== null) {
        inputValue = parseFloat(this.btc);

        console.log(inputValue);

        moneyValue = (inputValue * this.bitcoinService.getRateFloat()) / 1;
      }
    }
    return moneyValue;
  }
}
