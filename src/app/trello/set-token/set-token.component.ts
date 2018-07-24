import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-set-token',
  templateUrl: './set-token.component.html',
  styleUrls: ['./set-token.component.css']
})
export class SetTokenComponent implements OnInit, OnDestroy {
    private token: string;
    private fragmentsubscription: Subscription;
  constructor(private router: Router, private authService: AuthenticationService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.fragmentsubscription = this.activatedRoute.fragment.subscribe(
          fragment => {
              if (fragment) {
                  this.token = fragment.slice(6);
                  this.authService.setToken(this.token);
                  this.router.navigate(['/']);
              } else {
                  this.router.navigate(['/']);
              }
          }
      );
  }

    ngOnDestroy(): void {
      this.fragmentsubscription.unsubscribe();
    }

}
