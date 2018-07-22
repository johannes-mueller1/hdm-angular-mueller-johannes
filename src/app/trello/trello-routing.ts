import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SetTokenComponent} from './set-token/set-token.component';

const routes: Routes = [
    {path: 'set-trello-token', component: SetTokenComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
