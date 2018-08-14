import {Routes} from '@angular/router';
import {BoardsListComponent} from './boards-list/boards-list.component';
import {BoardItemComponent} from './boards-list/board-item/board-item.component';
import {ListItemComponent} from './boards-list/board-item/list-item/list-item.component';
import {ChartsComponent} from './charts/charts.component';
import {WelcomeComponent} from './welcome/welcome.component';



export const PRIVATE_ROUTES: Routes = [
    { path: 'boards/:board/:list', component: ListItemComponent},
    { path: 'boards/:board', component: BoardItemComponent},
    { path: 'boards', component: BoardsListComponent},
    { path: 'charts', component: ChartsComponent},
    { path: 'welcome', component: WelcomeComponent}
];
