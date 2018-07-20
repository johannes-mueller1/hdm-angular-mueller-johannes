import { Component, OnInit } from '@angular/core';
import {AuthorizeService} from '../../services/authorize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-token',
  templateUrl: './set-token.component.html',
  styleUrls: ['./set-token.component.css']
})
export class SetTokenComponent implements OnInit {

  constructor(private auth: AuthorizeService, private router: Router) { }

  ngOnInit() {
      const hash = window.location.hash;
      const token = hash.split('=')[1];
      this.auth.setToken(token);
      this.router.navigate(['/']);
  }

}
