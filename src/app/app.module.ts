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
import { HeaderComponent } from './private/header/header.component';
import { BoardsListComponent } from './private/boards-list/boards-list.component';
import { BoardItemComponent } from './private/boards-list/board-item/board-item.component';
import {DataService} from './private/data.service';
import {FormsModule} from '@angular/forms';
import { MessagesComponent } from './private/messages/messages.component';
import {MessageService} from './private/message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    PrivateComponent,
    HeaderComponent,
    BoardsListComponent,
    BoardItemComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      TrelloModule,
      FormsModule,
      BrowserAnimationsModule
  ],
  providers: [PublicGuard, PrivateGuard, DataService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
