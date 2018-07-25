import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BoardInterface} from './Interfaces/board.interface';
import {MeInterface} from './Interfaces/me.interface';

@Injectable()
export class TrelloApiService {
    constructor(private http: HttpClient) {}

    getMe() {
        return this.http.get<MeInterface>('https://api.trello.com/1/members/me/');
    }

    getBoards() {
        return this.http.get<Array<BoardInterface>>('https://api.trello.com/1/members/me/boards');
    }
}
