import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../trello/authentication.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    console.log('public');
    this.login();
  }

    login() {
        this.authService.login();
    }

}
