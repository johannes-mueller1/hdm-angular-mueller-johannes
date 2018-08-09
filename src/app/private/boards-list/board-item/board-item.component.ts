import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';
import {DataService} from '../../data.service';
import {TrelloApiService} from '../../../trello/trello-api.service';
import {Trello} from '../../../trello/Interfaces/trello.interface';
import Board = Trello.Board;
import List = Trello.List;
import {MessageService} from '../../message.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css']
})
export class BoardItemComponent implements OnInit, OnDestroy {
    board_id: string;
  subscription: Subscription;
  board: Board;
  lists: Array<List>;
  onEnter: Boolean = false;
  newListName: String;

  constructor( private activatedRoute: ActivatedRoute, private trelloapi: TrelloApiService, private message: MessageService, private router: Router, private data: DataService) {
  }

    ngOnInit(): void {
         // this.subscription = this.activatedRoute.params.subscribe(
         //     (blub: Params) => this.board = blub['board']
         // );
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (selectedBoard: Params) => {
                this.board_id = selectedBoard['board-id'];
                this.getBoard(this.board_id);
                this.getLists(this.board_id);
            },
                    (error: any) => console.log('error', error)
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getBoard(board_id: string) {
        this.trelloapi.getBoard(board_id).subscribe((result: Board) => {
                console.log('success', result);
                this.board = result;
                if (this.board.desc === null) {
                    this.board.desc = 'Define a description';
                }
            },
            (error: any) => {
                console.log('error', error);
            }
        );
    }

    getLists(board_id: string) {
        this.trelloapi.getLists(board_id).subscribe((result: Array<List>) => {
                console.log('success', result);
                this.lists = result;
            },
            (error: any) => {
                console.log('error', error);
            }
        );
    }



    onSaveDescription(boarddescription: string) {
      this.board.desc = boarddescription;
      this.trelloapi.updateBoard(this.board).subscribe(
          board => {
              console.log('Successful updated Trelloboard: ' + board.name);
          }
      );
    }

    onSaveListEnter(locallist: List) {
                  this.onEnter = true;
                  this.trelloapi.updateList(locallist).subscribe(
                      returnlist => {
                          console.log('Successful updated Trellolist: ' + returnlist.name);
                      }
                  );
          }

    onSaveListLeave(locallist: List) {
      if (this.onEnter === false) {
          this.trelloapi.updateList(locallist).subscribe(
              returnlist => {
                  console.log('Successful updated Trellolist: ' + returnlist.name);
              }
          );
      } else {
          this.onEnter = false;
      }
    }

    onCreate(name: string) {
        const newList: List = { name } as List;
        this.newListName = null;
        this.trelloapi.addList(this.board, newList)
            .subscribe(list => {
                this.lists.push(list);
                this.lists = this.lists.sort((n1, n2) => {
                    if (n1.name > n2.name) {
                        return -1;
                    }
                    if (n1.name < n2.name) {
                        return 1;
                    }
                    return 0;
                });
            });
    }

    onDetails(list: List) {
        console.log('List selected: ' + list.name);
        this.data.listSelected = list;
        this.router.navigate(['private', 'boards', this.board.name, list.name ], {queryParams: {'board-id': this.board.id, 'list-id': list.id}});
    }
}
