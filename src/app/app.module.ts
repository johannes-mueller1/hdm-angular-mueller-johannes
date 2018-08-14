import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
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
import { HeaderComponent } from './private/header/header.component';
import { BoardsListComponent } from './private/boards-list/boards-list.component';
import { BoardItemComponent } from './private/boards-list/board-item/board-item.component';
import {DataService} from './private/data.service';
import {FormsModule} from '@angular/forms';
import { MessagesComponent } from './private/messages/messages.component';
import {MessageService} from './private/message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListItemComponent } from './private/boards-list/board-item/list-item/list-item.component';
import { ChartsComponent } from './private/charts/charts.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { BarchartComponent } from './private/charts/barchart/barchart.component';
import { RadarchartComponent } from './private/charts/radarchart/radarchart.component';
import { WelcomeComponent } from './private/welcome/welcome.component';





@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    PrivateComponent,
    HeaderComponent,
    BoardsListComponent,
    BoardItemComponent,
    MessagesComponent,
    ListItemComponent,
    ChartsComponent,
    BarchartComponent,
    RadarchartComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      TrelloModule,
      FormsModule,
      BrowserAnimationsModule,
      MDBBootstrapModule.forRoot()
  ],
    schemas: [NO_ERRORS_SCHEMA],
  providers: [PublicGuard, PrivateGuard, DataService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
