import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';
import {DataService} from '../../data.service';
import {TrelloApiService} from '../../../trello/trello-api.service';
import {Trello} from '../../../trello/Interfaces/trello.interface';
import Board = Trello.Board;
import List = Trello.List;

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


  constructor( private activatedRoute: ActivatedRoute, private trelloapi: TrelloApiService) { }

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

    getBoard(board_id: string) {
        this.trelloapi.getBoard(board_id).subscribe((result: Board) => {
                console.log('success', result);
                this.board = result;
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

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

}
