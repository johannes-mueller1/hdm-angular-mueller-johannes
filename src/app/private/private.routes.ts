import {Routes} from '@angular/router';
import {BoardsListComponent} from './boards-list/boards-list.component';

export const PRIVATE_ROUTES: Routes = [
    { path: 'boards', component: BoardsListComponent}
];
