import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../trello/authentication.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  token: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.token = this.authService.getToken();
    console.log('private');
  }

}
