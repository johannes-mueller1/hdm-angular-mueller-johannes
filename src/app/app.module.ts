import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import {TrelloModule} from './trello/trello.module';
import {AuthenticationService} from './trello/authentication.service';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import {PublicGuard} from './public/public.guard';
import {PrivateGuard} from './private/private.guard';



@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    PrivateComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      TrelloModule
  ],
  providers: [AuthenticationService, PublicGuard, PrivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
