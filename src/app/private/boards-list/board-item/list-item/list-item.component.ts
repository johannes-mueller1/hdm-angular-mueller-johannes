import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';
import {Trello} from '../../../../trello/Interfaces/trello.interface';
import Board = Trello.Board;
import List = Trello.List;
import Card = Trello.Card;
import {TrelloApiService} from '../../../../trello/trello-api.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  list_id: string;
  board_id: string;
  board: Board;
  list: List;
  cards: Array<Card>;
  newCardName: string;
  onEnter: Boolean = false;


  constructor(private activatedRoute: ActivatedRoute, private api: TrelloApiService) {
  }

    ngOnInit(): void {
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (selectedList: Params) => {
                this.board_id = selectedList['board-id'];
                this.list_id = selectedList['list-id'];
                this.getBoard(this.board_id);
                this.getList(this.list_id);
                this.getCards(this.list_id);
            },
            (error: any) => console.log('error', error)
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private getBoard(board_id: string) {
    this.api.getBoard(board_id).subscribe( (result: Board) => {
      this.board = result;
    });
    }

    private getList(list_id: string) {
    this.api.getList(list_id).subscribe((result: List) => {
      this.list = result;
    });
    }

    private getCards(list_id: string) {
    this.api.getCards(list_id).subscribe( (result: Array<Card>) => {
      this.cards = result;
    });
    }

    onCreate(name: string, desc: string) {
        const newCard: Card = { name, desc } as Card;
        this.newCardName = null;
        this.api.addCard(this.list, newCard)
            .subscribe(card => {
                this.cards.push(card);
                this.cards = this.cards.sort((n1, n2) => {
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

    onSaveListEnter(card: Card) {
        this.onEnter = true;
        this.api.updateList(card).subscribe(
            result => {
                console.log('Successful updated Trello Card: ' + result.name);
            }
        );
    }

    onSaveListLeave(card: Card) {
        if (this.onEnter === false) {
            this.api.updateList(card).subscribe(
                result => {
                    console.log('Successful updated Trello Card: ' + result.name);
                }
            );
        } else {
            this.onEnter = false;
        }
    }

    deleteCard (card: Card) {
        if (confirm('Are you sure to delete ' + card.name)) {
            this.api.deleteCard(card.id).subscribe();
            let index: number;
            for (const i in this.cards) {
                if (this.cards[i].id === card.id) {
                    index = Number(i);
                }
            }
            console.log('DeleteBoardOperation, The index is: ' + index);
            this.cards.splice(index, 1);
        }

    }

}
