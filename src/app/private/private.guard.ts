import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../trello/authentication.service';

@Injectable()
export class PrivateGuard implements CanActivate {


    constructor(private router: Router, private authService: AuthenticationService) {
    }
    canActivate(): boolean {
        if (this.authService.getToken()) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
