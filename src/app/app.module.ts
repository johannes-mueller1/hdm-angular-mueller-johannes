import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { SetTokenComponent } from './components/set-token/set-token.component';
import { HomeComponent } from './components/home/home.component';
import {AuthenticationGuard} from './autentication.guard';



@NgModule({
  declarations: [
    AppComponent,
    SetTokenComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
      HttpClientModule,
      AppRoutingModule
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
