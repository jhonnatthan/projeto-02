import { ToastrService } from 'ngx-toastr';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

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

  ngOnInit(): void {}

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
      if (this.btc !== null) {
        inputValue = parseFloat(this.btc);

        moneyValue = (inputValue * this.bitcoinService.getRateFloat()) / 1;
      }
    }
    return moneyValue;
  }

  public handleBuy() {
    let inputValue = 0;
    if (this.bitcoinService.currentPrice) {
      if (this.money !== null) {
        inputValue = parseFloat(this.money);
        if (inputValue >= 100) {
          if (inputValue <= this.authService.user.moneyBalance) {
            if (this.authService.buyBtc(inputValue)) {
              this.toastr.success('Compra de bitcoin realizada com sucesso!');
            } else {
              this.toastr.error('Falha ao comprar BTC');
            }
          } else {
            this.toastr.error('Falha ao vender BTC, saldo insuficiente');
          }
        } else {
          this.toastr.error('Valor abaixo de R$ 100,00');
        }
      } else {
        this.toastr.error('Campo vazio');
      }
    } else {
      this.toastr.error('Nenhuma cotação encontrada!');
    }
  }

  public handleSell() {
    let inputValue = 0;
    if (this.bitcoinService.currentPrice) {
      if (this.btc !== null) {
        inputValue = parseFloat(this.btc);

        if (inputValue <= this.authService.user.bitcoinBalance) {
          if (this.authService.sellBtc(inputValue)) {
            this.toastr.success('Venda de bitcoin realizada com sucesso!');
          } else {
            this.toastr.error('Falha ao vender BTC, saldo insuficiente');
          }
        } else {
          this.toastr.error('Campo vazio');
        }
      } else {
        this.toastr.error('Campo vazio');
      }
    } else {
      this.toastr.error('Nenhuma cotação encontrada!');
    }
  }
}
