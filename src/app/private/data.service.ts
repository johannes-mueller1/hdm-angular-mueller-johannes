import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Trello} from '../trello/Interfaces/trello.interface';
import Board = Trello.Board;
import {TrelloApiService} from '../trello/trello-api.service';
import List = Trello.List;

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  boardSelected: Board;
    listSelected: List;

    constructor(private api: TrelloApiService) { }
    ngOnInit(): void {
    }
}
