import { Component, OnInit } from '@angular/core';
import {TrelloApiService} from '../../trello/trello-api.service';
import {BoardInterface} from '../../trello/Interfaces/board.interface';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css']
})
export class BoardsListComponent implements OnInit {
   public boards: Array<BoardInterface>;

  constructor(private api: TrelloApiService) { }

  ngOnInit() {
      this.getBoards();
  }

  getBoards() {
      this.api.getBoards().subscribe((result: Array<BoardInterface>) => {
              console.log('success', result);
              this.boards = result;
          },
          (error: any) => {
              console.log('error', error);
          }
      );
  }
}
