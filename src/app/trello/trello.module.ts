import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetTokenComponent } from './set-token/set-token.component';
import {AppRoutingModule} from './trello-routing';

@NgModule({
  imports: [
    CommonModule,
     AppRoutingModule
  ],
  declarations: [SetTokenComponent]
})
export class TrelloModule { }
