import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Trello} from './Interfaces/trello.interface';
import User = Trello.User;
import Board = Trello.Board;
import List = Trello.List;
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from './http-error-handler.service';

@Injectable()
export class TrelloApiService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('Trello Api Service');
    }

    getMe() {
        return this.http.get<User>('https://api.trello.com/1/members/me/')
            .pipe(
                catchError(this.handleError('getUser'))
            );
    }

    getBoards() {
        return this.http.get<Array<Board>>('https://api.trello.com/1/members/me/boards')
            .pipe(
                catchError(this.handleError('getBoards'))
            );
    }

    getLists(board_id: string) {
        return this.http.get<Array<List>>('https://api.trello.com/1/boards/' + board_id + '/lists')
            .pipe(
                catchError(this.handleError('getLists'))
            );
    }

    getBoard(board_id: string) {
        return this.http.get<Board>('https://api.trello.com/1/boards/' + board_id)
            .pipe(
                catchError(this.handleError('getBoard'))
            );
    }

    /** PUT: update the board on the server. Returns the updated board upon success. */
    updateBoard (board: Board): Observable<Board> {
        return this.http.put<Board>('https://api.trello.com/1/boards/' + board.id, board)
            .pipe(
                catchError(this.handleError('updateBoard', board))
            );
    }

    /** POST: add a new board to trello */
    addBoard (board: Board): Observable<Board> {
        return this.http.post<Board>('https://api.trello.com/1/boards/?name=' + board.name, board)
            .pipe(
                catchError(this.handleError('addBoard', board))
            );
    }

}
