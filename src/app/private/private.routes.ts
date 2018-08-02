import {Routes} from '@angular/router';
import {BoardsListComponent} from './boards-list/boards-list.component';
import {BoardItemComponent} from './boards-list/board-item/board-item.component';



export const PRIVATE_ROUTES: Routes = [
    { path: 'boards/:board', component: BoardItemComponent},
    { path: 'boards', component: BoardsListComponent }
];
