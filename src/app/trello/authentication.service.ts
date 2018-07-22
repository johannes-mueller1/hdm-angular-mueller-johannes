import { Injectable } from '@angular/core';
import {Local_Storage_Key} from './local-storage-key';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    public token: string;
    key = 'f6ae844248148c53f5b980de497b9921';

  constructor() {
    this.token = localStorage.getItem(Local_Storage_Key);
  }

    login() {
      window.location.href = this.getTokenRequestUrl();
    }

    getTokenRequestUrl(): string {
        const returnUrl = encodeURI(window.location.href + '/set-trello-token');
        return 'https://trello.com/1/authorize?response_type=token&key=' + this.key +
        '&return_url=' + returnUrl +
        '&callback_method=fragment&scope=read&expiration=never&name=Angular-JM097';
    }

    setToken(token: string) {
        localStorage.setItem(Local_Storage_Key, token);
    }

    getToken(): string | undefined {
        return localStorage.getItem(Local_Storage_Key);
    }
}
