import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../trello/authentication.service';

@Injectable()
export class PublicGuard implements CanActivate {


    constructor(private router: Router, private authService: AuthenticationService) {
    }


    /**
     * I make sure that no visitor that has a token is able to visit 'public' routes.
     * E.g. splash screen and login should only be visible to users that aren't already logged in.*/

    canActivate(): boolean {
        if (this.authService.getToken()) {
            this.router.navigate(['private']);
            return false;
        } else {
            return true;
        }
    }
}
