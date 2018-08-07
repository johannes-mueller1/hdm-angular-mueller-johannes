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
    newBoardName: string;


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


    // onSave(name: string) {
    //    for (const i of this.boards) {
    //        this.api.updateBoard(i).subscribe(board => {
    //           console.log('succesfull updated :' +  board.name);
    //           console.log(board);
    //        });
    //    }
    //    if (name) {
    //        const newBoard: Board = { name } as Board;
    //        this.newBoardName = null;
    //        this.api.addBoard(newBoard)
    //            .subscribe(board => {
    //                this.boards.push(board);
    //                this.boards = this.boards.sort((n1, n2) => {
    //                    if (n1.name > n2.name) {
    //                        return 1;
    //                    }
    //                    if (n1.name < n2.name) {
    //                        return -1;
    //                    }
    //                    return 0;
    //                });
    //            });
    //    }
    // }

    onCreate(name: string) {
           const newBoard: Board = { name } as Board;
           this.newBoardName = null;
           this.api.addBoard(newBoard)
               .subscribe(board => {
                   this.boards.push(board);
                   this.boards = this.boards.sort((n1, n2) => {
                       if (n1.name > n2.name) {
                           return 1;
                       }
                       if (n1.name < n2.name) {
                           return -1;
                       }
                       return 0;
                   });
               });
    }

    onEnterAndBlur(methodBoard: Board) {
           this.api.updateBoard(methodBoard).subscribe(board => {
              console.log('succesfull updated :' +  board.name);
              console.log(board);
           });
    }
}
