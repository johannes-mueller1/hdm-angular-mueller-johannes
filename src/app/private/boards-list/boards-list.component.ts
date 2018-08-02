import { Component, OnInit } from '@angular/core';
import {TrelloApiService} from '../../trello/trello-api.service';
import { Router} from '@angular/router';
import {DataService} from '../data.service';
import {Trello} from '../../trello/Interfaces/trello.interface';
import Board = Trello.Board;

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.css']
})
export class BoardsListComponent implements OnInit {
   public boards: Array<Board>;

  constructor(private api: TrelloApiService, private router: Router, private data: DataService) { }

  ngOnInit() {
      this.getBoards();
  }

  getBoards() {
      this.api.getBoards().subscribe((result: Array<Board>) => {
              console.log('success', result);
              this.boards = result;
          },
          (error: any) => {
              console.log('error', error);
          }
      );
  }
  onClick(board: Board) {
      console.log('Board selected: ' + board.name);
      this.data.boardSelected = board;
      this.router.navigate(['private', 'boards', board.name], {queryParams: {'board-id': board.id}});
  }

    addBoard(board_name: string) {
        console.log('Add Boardname: ' + board_name);
    }
}
