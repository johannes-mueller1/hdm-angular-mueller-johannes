import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../trello/authentication.service';

@Injectable()
export class PublicGuard implements CanActivate {


    constructor(private router: Router, private authService: AuthenticationService) {
    }

    canActivate(): boolean {
        if (this.authService.getToken()) {
            this.router.navigate(['private', 'welcome']);
            return false;
        } else {
            return true;
        }
    }
}
