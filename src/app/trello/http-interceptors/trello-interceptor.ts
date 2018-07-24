import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {AuthenticationService} from '../authentication.service';
import {throwError} from 'rxjs/internal/observable/throwError';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TrelloInterceptor implements HttpInterceptor {
    constructor (private authService: AuthenticationService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        if (!token) {
            return throwError ('No valid token available for the http request');
        }
        req = req.clone({
            setParams: {
                token: this.authService.token,
                key: this.authService.key,
            }
        });
        return next.handle(req);
    }
}
