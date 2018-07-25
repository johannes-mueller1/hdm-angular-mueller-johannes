import { Component, OnInit } from '@angular/core';
import {MeInterface} from '../../trello/Interfaces/me.interface';
import {TrelloApiService} from '../../trello/trello-api.service';
import {AuthenticationService} from '../../trello/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  me: MeInterface;
  title = 'Angular App';
  constructor(private api: TrelloApiService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.api.getMe().subscribe((data: MeInterface) => this.me = { ...data });
  }

    logout() {
        this.authService.deleteToken();
        this.router.navigate(['/']);
    }

}
