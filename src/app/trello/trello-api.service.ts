import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Trello} from './Interfaces/trello.interface';
import User = Trello.User;
import Board = Trello.Board;
import List = Trello.List;
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from './http-error-handler.service';
import Card = Trello.Card;
import Action = Trello.Action;

@Injectable()
export class TrelloApiService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('Trello Api Service');
    }

    /** GET the User, who is connected to trello, from trello */
    getMe() {
        return this.http.get<User>('https://api.trello.com/1/members/me/')
            .pipe(
                catchError(this.handleError('getUser'))
            );
    }

    /** GET the Boards from trello */
    getBoards() {
        return this.http.get<Array<Board>>('https://api.trello.com/1/members/me/boards')
            .pipe(
                catchError(this.handleError('getBoards'))
            );
    }

    /** GET the Lists for specific board from trello */
    getLists(board_id: string) {
        return this.http.get<Array<List>>('https://api.trello.com/1/boards/' + board_id + '/lists')
            .pipe(
                catchError(this.handleError('getLists'))
            );
    }

    /** GET the Cards for a specific list from trello */
    getCards(list_id: string) {
        return this.http.get<Array<Card>>('https://api.trello.com/1/lists/' + list_id + '/cards')
            .pipe(
                catchError(this.handleError('getCards'))
            );
    }

    /** GET the Actions for a specific Board from trello */
    getActions(board: Board) {
        return this.http.get<Array<Action>>('https://api.trello.com/1/boards/' + board.id + '/actions')
            .pipe(
                catchError(this.handleError('getActions'))
            );
    }

    /** GET a specific Board by Board Id */
    getBoard(board_id: string) {
        return this.http.get<Board>('https://api.trello.com/1/boards/' + board_id)
            .pipe(
                catchError(this.handleError('getBoard'))
            );
    }

    /** GET a specific List by List Id */
    getList(list_id: string) {
        return this.http.get<List>('https://api.trello.com/1/lists/' + list_id)
            .pipe(
                catchError(this.handleError('getList'))
            );
    }

    /** GET a specific Card by Card Id */
    getCard(card_id: string) {
        return this.http.get<Card>('https://api.trello.com/1/cards/' + card_id)
            .pipe(
                catchError(this.handleError('getCard'))
            );
    }

    /** PUT: update the board on the server. Returns the updated board upon success. */
    updateBoard (board: Board): Observable<Board> {
        return this.http.put<Board>('https://api.trello.com/1/boards/' + board.id, board)
            .pipe(
                catchError(this.handleError('updateBoard', board))
            );
    }

    /** PUT: update the list on the server. Returns the updated board upon success. */
    updateList (list: List): Observable<List> {
        return this.http.put<List>('https://api.trello.com/1/lists/' + list.id, list)
            .pipe(
                catchError(this.handleError('updateList', list))
            );
    }

    /** PUT: update the card on the server. Returns the updated board upon success. */
    updateCard (card: Card): Observable<Card> {
        return this.http.put<Card>('https://api.trello.com/1/cards/' + card.id, card)
            .pipe(
                catchError(this.handleError('updateCard', card))
            );
    }

    /** POST: add a new board to trello */
    addBoard (board: Board): Observable<Board> {
        return this.http.post<Board>('https://api.trello.com/1/boards/?name=' + board.name, board)
            .pipe(
                catchError(this.handleError('addBoard', board))
            );
    }

    /** POST: add a new board to trello */
    addList (board: Board, list: List): Observable<List> {
        return this.http.post<List>('https://api.trello.com/1/lists?name=' + list.name + '&idBoard=' + board.id, list)
            .pipe(
                catchError(this.handleError('addList', list))
            );
    }

    /** POST: add a new card to trello */
    addCard(list: List, newCard: Card): Observable<Card> {
        return this.http.post<Card>('https://api.trello.com/1/cards?idList=' + list.id, newCard)
            .pipe(
                catchError(this.handleError('addCard', newCard))
            );
    }

    /** DELETE: delete the board from the server */
    deleteBoard (id: string): Observable<{}> {
        const url = 'https://api.trello.com/1/boards/' + id;
        return this.http.delete(url)
            .pipe(
                catchError(this.handleError('deleteBoard'))
            );
    }

    /** DELETE: delete the card from the server */
    deleteCard (id: string): Observable<{}> {
        const url = 'https://api.trello.com/1/cards/' + id;
        return this.http.delete(url)
            .pipe(
                catchError(this.handleError('deleteCard'))
            );
    }
}
