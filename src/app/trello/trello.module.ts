import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetTokenComponent } from './set-token/set-token.component';
import {AppRoutingModule} from './trello-routing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TrelloInterceptor} from './http-interceptors/trello-interceptor';
import {AuthenticationService} from './authentication.service';
import {TrelloApiService} from './trello-api.service';
import {HttpErrorHandler} from './http-error-handler.service';

@NgModule({
  imports: [
    CommonModule,
     AppRoutingModule,
      HttpClientModule
  ],
  declarations: [SetTokenComponent],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: TrelloInterceptor, multi: true},
        AuthenticationService, TrelloApiService, HttpErrorHandler
    ],
})
export class TrelloModule { }
