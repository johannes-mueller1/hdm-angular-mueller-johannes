import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../trello/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  token: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.token = this.authService.getToken();
    console.log('private');
  }

    logout() {
        this.authService.deleteToken();
        this.router.navigate(['/']);
    }
}
