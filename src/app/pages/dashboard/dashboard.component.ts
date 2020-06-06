import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, Injectable } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  generateChart,
} from '../../variables/charts';
import { BitcoinService } from 'src/app/services/bitcoin/bitcoin.service';
import formatDateToHours from 'src/app/utils/formatDateToHours';
import { ToastrService } from 'ngx-toastr';

@Injectable()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public currencyChart;
  public currencyPercent = 0;
  public currencyNegative = false;

  public btcChart;
  public btcPercent = 0;
  public btcNegative = false;

  public moneyChart;
  public moneyPercent = 0;
  public moneyNegative = false;

  constructor(
    private bitcoinService: BitcoinService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    parseOptions(Chart, chartOptions());

    this.generateInfos();
  }

  public generateInfos() {
    this.generateCurrencyChart();
    this.generateCurrencyPercentage();

    this.generateMoneyBalanceChart();
    this.generateMoneyHistoryChart();
    this.generateMoneyPercentage();

    this.generateBitcoinBalanceChart();
    this.generateBitcoinHistoryChart();
    this.generateBtcPercentage();
  }

  public updateInfos() {
    this.generateCurrencyPercentage();
    this.generateMoneyPercentage();
    this.generateBtcPercentage();


  }


  public getPercentage(a, b) {
    const data = {
      percentage: 0,
      negative: false,
    };

    data.percentage = 100 * Math.abs((a - b) / ((a + b) / 2));

    data.percentage = data.percentage / 100;

    if (a < b) {
      data.percentage = data.percentage * -1;
      data.negative = true;
    }

    return data;
  }

  public generateCurrencyChart() {
    const list = [...this.bitcoinService.updateList].slice(0, 10).reverse();

    const dataArr = list.map((item) => item.BRL);
    const labelArr = list.map((item) => formatDateToHours(item.timestamp));

    const currencyChart = document.getElementById('chart-sales');

    const { data, options } = generateChart(
      'Preço bitcoin',
      labelArr,
      dataArr,
      true
    );

    this.currencyChart = new Chart(currencyChart, {
      type: 'line',
      options,
      data,
    });
  }

  public generateCurrencyPercentage() {
    const list = [...this.bitcoinService.updateList].slice(0, 10).reverse();

    if (list.length > 1) {
      const newPrice = list[0].BRL;
      const lastPrice = list[1].BRL;

      const percentageData = this.getPercentage(newPrice, lastPrice);

      this.currencyPercent = percentageData.percentage;
      this.currencyNegative = percentageData.negative;
    } else {
      this.currencyPercent = 0;
      this.currencyNegative = false;
    }
  }

  public generateMoneyBalanceChart() {
    const list = [...this.authService.user.moneyHistory];

    const dataArr = list.map((item) => item.balance);
    const labelArr = list.map((item) => item.description);

    const moneyChart = document.getElementById('money-balance-chart');

    const { data, options } = generateChart(
      'Balanço BRL',
      labelArr,
      dataArr,
      true
    );

    this.moneyChart = new Chart(moneyChart, {
      type: 'line',
      options,
      data,
    });
  }

  public generateBitcoinBalanceChart() {
    const list = [...this.authService.user.bitcoinHistory];

    const dataArr = list.map((item) => item.balance);
    const labelArr = list.map((item) => item.description);

    const chart = document.getElementById('bitcoin-balance-chart');

    const { data, options } = generateChart('Balanço BTC', labelArr, dataArr);

    this.btcChart = new Chart(chart, {
      type: 'line',
      options,
      data,
    });
  }

  public generateMoneyHistoryChart() {
    const list = [...this.authService.user.moneyHistory];

    const dataArr = list.map((item) => item.value);
    const labelArr = list.map((item) => item.description);

    const chart = document.getElementById('money-history-chart');

    const { data, options } = generateChart(
      'Saldo BRL',
      labelArr,
      dataArr,
      true
    );

    this.moneyChart = new Chart(chart, {
      type: 'line',
      options,
      data,
    });
  }

  public generateMoneyPercentage() {
    const list = [...this.authService.user.moneyHistory].reverse();

    if (list.length > 1) {
      const newValue = list[0].balance;
      const lastValue = list[1].balance;

      const percentageData = this.getPercentage(newValue, lastValue);

      this.moneyPercent = percentageData.percentage;
      this.moneyNegative = percentageData.negative;
    } else {
      this.moneyPercent = 0;
      this.moneyNegative = false;
    }
  }

  public generateBitcoinHistoryChart() {
    const list = [...this.authService.user.bitcoinHistory];

    const dataArr = list.map((item) => item.value);
    const labelArr = list.map((item) => item.description);

    const chart = document.getElementById('bitcoin-history-chart');

    const { data, options } = generateChart('Saldo BTC', labelArr, dataArr);

    this.btcChart = new Chart(chart, {
      type: 'line',
      options,
      data,
    });
  }

  public generateBtcPercentage() {
    const list = [...this.authService.user.bitcoinHistory].reverse();

    if (list.length > 1) {
      const newValue = list[0].balance;
      const lastValue = list[1].balance;

      const percentageData = this.getPercentage(newValue, lastValue);

      this.btcPercent = percentageData.percentage;
      this.btcNegative = percentageData.negative;
    } else {
      this.btcPercent = 0;
      this.btcNegative = false;
    }
  }
}
