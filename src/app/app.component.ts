import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './trello/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    token: string;
    constructor(private authService: AuthenticationService) {}

    title = 'Angular App - Johannes Müller';




    ngOnInit(): void {
        this.token = this.authService.getToken();
    }
}
