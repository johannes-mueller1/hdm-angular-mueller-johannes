import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../trello/authentication.service';
import {variable} from '@angular/compiler/src/output/output_ast';

@Injectable()
export class PrivateGuard implements CanActivate {


    constructor(private router: Router, private authService: AuthenticationService) {
    }
    canActivate(): boolean {
        const token: string = this.authService.getToken();
        if (token) {
            console.log('private guard: ' + token);
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
