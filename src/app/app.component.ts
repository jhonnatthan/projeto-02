import { ToastrService } from 'ngx-toastr';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Projeto 02';

  constructor(
    private bitcoinService: BitcoinService,
    private toastr: ToastrService
  ) {
    this.updateCurrency();
    setInterval(() => {
      this.updateCurrency();
    }, 60000);
  }

  public updateCurrency() {
    this.bitcoinService.update(() => {
      this.toastr.success('Cotação atualizada!');
    });
  }
}
