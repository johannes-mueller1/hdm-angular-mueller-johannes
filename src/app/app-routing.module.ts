import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SetTokenComponent} from './components/set-token/set-token.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
    {path: 'set-token', component: SetTokenComponent},
    {path: 'home', component: HomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
