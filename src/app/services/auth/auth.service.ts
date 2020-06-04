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
  initialUsers: User[] = [
    {
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
    },
  ];

  users: User[] = this.initialUsers;

  user: User;

  constructor(private storageService: StorageService) {
    this.users = this.storageService.get('@app:users') ?? this.initialUsers;
    this.user = this.storageService.get('@app:activedUser') ?? undefined;
  }

  public login(data: LoginData) {
    const user = this.users.find((user) => {
      if (user.email === data.email && user.password === data.password) {
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

    this.storageService.set('@app:users', this.users);
  }

  public logout() {
    this.user = undefined;
    this.storageService.remove('@app:activedUser');
    return true;
  }
}
