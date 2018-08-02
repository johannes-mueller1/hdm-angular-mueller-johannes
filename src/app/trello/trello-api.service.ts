import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Trello} from './Interfaces/trello.interface';
import User = Trello.User;
import Board = Trello.Board;
import List = Trello.List;

@Injectable()
export class TrelloApiService {
    constructor(private http: HttpClient) {}

    getMe() {
        return this.http.get<User>('https://api.trello.com/1/members/me/');
    }

    getBoards() {
        return this.http.get<Array<Board>>('https://api.trello.com/1/members/me/boards');
    }

    getLists(board_id: string) {
        return this.http.get<Array<List>>('https://api.trello.com/1/boards/' + board_id + '/lists');
    }

    getBoard(board_id: string) {
        return this.http.get<Board>('https://api.trello.com/1/boards/' + board_id);
    }
}
