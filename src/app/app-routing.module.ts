import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PrivateGuard} from './private/private.guard';
import {PublicGuard} from './public/public.guard';
import {PrivateComponent} from './private/private.component';
import {PublicComponent} from './public/public.component';
import {PRIVATE_ROUTES} from './private/private.routes';

const routes: Routes = [
    {path: 'private', canActivate: [PrivateGuard], component: PrivateComponent, children: PRIVATE_ROUTES},
    {path: '', canActivate: [PublicGuard], component: PublicComponent}
    ];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
