import { BitcoinService } from './../bitcoin/bitcoin.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from './../storage/storage.service';
import { Injectable } from '@angular/core';

type OrderType = 'SELL' | 'BUY';

type Order = {
  type: OrderType;
  description: string;
  balance: number;
  value: number;
  date: Date;
};

type User = {
  name: string;
  email: string;
  password: string;
  moneyBalance: number;
  moneyHistory: Order[];
  bitcoinBalance: number;
  bitcoinHistory: Order[];
};

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  initialUser: User = {
    name: 'Jhonnatthan Santana',
    email: 'admin@bitmarket.com',
    password: '123456',
    moneyBalance: 1000,
    moneyHistory: [
      {
        type: 'BUY',
        value: 350,
        date: new Date(),
        description: 'Bonus',
        balance: 350,
      },
      {
        type: 'BUY',
        value: 250,
        date: new Date(),
        description: 'Bonus',
        balance: 600,
      },
      {
        type: 'BUY',
        value: 400,
        date: new Date(),
        description: 'Bonus',
        balance: 1000,
      },
    ],
    bitcoinBalance: 1,
    bitcoinHistory: [
      {
        type: 'BUY',
        value: 0.35,
        date: new Date(),
        description: 'Bonus',
        balance: 0.35,
      },
      {
        type: 'BUY',
        value: 0.4,
        date: new Date(),
        description: 'Bonus',
        balance: 0.75,
      },
      {
        type: 'BUY',
        value: 0.25,
        date: new Date(),
        description: 'Bonus',
        balance: 1,
      },
    ],
  };

  users: User[] = [];

  user: User;

  constructor(
    private storageService: StorageService,
    private toastr: ToastrService,
    private bitcoinService: BitcoinService
  ) {
    const storedUsers: User[] = this.storageService.get('@app:users') ?? [];

    if (storedUsers.length === 0) {
      this.registerRaw(this.initialUser);
    } else {
      this.users = storedUsers;
    }
    this.user = this.storageService.get('@app:activedUser') ?? undefined;
  }

  public login(data: LoginData) {
    const user = this.users.find((_user) => {
      if (_user.email === data.email && _user.password === data.password) {
        return true;
      }
      return false;
    });

    if (user) {
      this.user = user;
      this.storageService.set('@app:activedUser', user);
      return true;
    }

    return false;
  }

  public registerRaw(userData: User) {
    this.users.push(userData);

    this.saveUsers();
  }

  public register(data: RegisterData) {
    const { name, email, password } = data;

    const userData: User = {
      name,
      email,
      password,
      moneyBalance: 1000,
      moneyHistory: [
        {
          type: 'BUY',
          value: 750,
          date: new Date(),
          description: 'Bonus',
          balance: 750,
        },
        {
          type: 'BUY',
          value: 250,
          date: new Date(),
          description: 'Bonus',
          balance: 1000,
        },
      ],
      bitcoinBalance: 0,
      bitcoinHistory: [],
    };

    this.users.push(userData);

    this.saveUsers();
  }

  public saveUsers() {
    this.storageService.set('@app:users', this.users);
    this.storageService.set('@app:activedUser', this.user);
  }

  public logout() {
    this.user = undefined;
    this.storageService.remove('@app:activedUser');
    return true;
  }

  public buyBtc(value: number): boolean {
    const userIndex = this.users.findIndex(
      (user) => this.user.email === user.email
    );

    if (userIndex !== -1) {
      const newUserData: User = { ...this.users[userIndex] };

      const newMoneyBalance = newUserData.moneyBalance - value;
      newUserData.moneyBalance = newMoneyBalance;
      newUserData.moneyHistory.push({
        type: 'SELL',
        value: value,
        date: new Date(),
        description: 'Compra BTC',
        balance: newMoneyBalance,
      });

      const btcValue = (value * 1) / this.bitcoinService.getRateFloat();
      const newBtcBalance = newUserData.bitcoinBalance + btcValue;
      newUserData.bitcoinBalance = newBtcBalance;
      newUserData.bitcoinHistory.push({
        type: 'BUY',
        value: btcValue,
        date: new Date(),
        description: 'Compra BTC',
        balance: newBtcBalance,
      });

      this.users[userIndex] = newUserData;
      this.user = newUserData;

      this.saveUsers();
      return true;
    } else {
      this.toastr.error('Usuário não encontrado no banco de dados');
      return false;
    }
  }

  public sellBtc(value: number): boolean {
    const userIndex = this.users.findIndex(
      (user) => this.user.email === user.email
    );

    if (userIndex !== -1) {
      const newUserData: User = { ...this.users[userIndex] };

      const moneyValue = (value * this.bitcoinService.getRateFloat()) / 1;
      const newMoneyBalance = newUserData.moneyBalance + moneyValue;
      newUserData.moneyBalance = newMoneyBalance;
      newUserData.moneyHistory.push({
        type: 'BUY',
        value: moneyValue,
        date: new Date(),
        description: 'Venda BTC',
        balance: newMoneyBalance,
      });

      const newBtcBalance = newUserData.bitcoinBalance - value;
      newUserData.bitcoinBalance = newBtcBalance;
      newUserData.bitcoinHistory.push({
        type: 'SELL',
        value: value,
        date: new Date(),
        description: 'Venda BTC',
        balance: newBtcBalance,
      });

      this.users[userIndex] = newUserData;
      this.user = newUserData;

      this.saveUsers();
      return true;
    } else {
      return false;
    }
  }
}
