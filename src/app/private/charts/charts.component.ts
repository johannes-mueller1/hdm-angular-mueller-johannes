import { Component, OnInit } from '@angular/core';
import {TrelloApiService} from '../../trello/trello-api.service';
import {Trello} from '../../trello/Interfaces/trello.interface';
import Board = Trello.Board;
import Action = Trello.Action;
import User = Trello.User;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  chart = [];
  boards: Array<Board>;
  actions: Action[];
  boardActions: Action[];
  types: string[];
  board: Board;
  boardSelect: string;
  me: User;
  boardUsers: Array<string>;
  UsersActionsCounts: Array<number>;
  percentageOfActions: Array<number>;
  barChartDatasets: Array<any>;
  TypeActionsCounts: Array<number>;
  TypePercantageOfActions: Array<number>;
  radarChartDatasets: Array<any>;

  constructor(private api: TrelloApiService) { }

  ngOnInit() {
    this.types = new Array<string>();
    this.actions = new Array<Action>();
      this.api.getBoards().subscribe((resultboards: Array<Board>) => {
          this.boards = resultboards;
          for (const board of this.boards) {
            this.api.getActions(board).subscribe((resultactions: Array<Action>) => {
              for (const action of resultactions) {
                this.actions.push(action);
                let typeexistance: Boolean = false;
                for (const type of this.types) {
                  if (type === action.type ) {
                    typeexistance = true;
                  }
                }
                if (typeexistance === false) {
                  this.types.push(action.type);
                }
                console.log(action);
              }
            });
          }
      });
      this.api.getMe().subscribe((data: User) => this.me = { ...data });
  }

    onChange(board_id: string) {
        if (board_id !== 'Select a Board') {
            console.log(board_id);
            console.log('hello');
            this.api.getBoard(board_id).subscribe((result: Board) => {
                this.board = result;
                this.api.getActions(this.board).subscribe((result_action: Array<Action>) => {
                    this.boardActions = result_action;
                    this.getUsersOfBoard();
                    this.UsersActionsCounts = new Array<number>();
                    this.percentageOfActions = new Array<number>();
                    for (const user of this.boardUsers) {
                        let TempUsersActionCount = 0;
                        for (const action of this.boardActions) {
                            if (action.memberCreator.username === user) {
                                TempUsersActionCount++;
                            }
                        }
                        this.UsersActionsCounts.push(TempUsersActionCount);
                        this.percentageOfActions.push((TempUsersActionCount / this.boardActions.length) * 100);
                    }
                    this.barChartDatasets = [
                        {data: this.UsersActionsCounts, label: 'count'},
                        {data: this.percentageOfActions, label: 'percentage'}
                    ];

                    this.TypeActionsCounts = new Array<number>();
                    this.TypePercantageOfActions = new Array<number>();

                    for (const type of this.types) {
                        let TempTypeActionCount = 0;
                        for (const action of this.boardActions) {
                            if (action.type === type) {
                                TempTypeActionCount++;
                            }
                        }
                        this.TypeActionsCounts.push(TempTypeActionCount);
                        this.TypePercantageOfActions.push((TempTypeActionCount / this.boardActions.length) * 100);
                    }
                    this.radarChartDatasets = [
                        {data: this.TypeActionsCounts, label: 'count'},
                        {data: this.TypePercantageOfActions, label: 'percentage'}
                    ];
                });
            });
        }
    }

    getUsersOfBoard() {
        this.boardUsers = new Array<string>();
        for (const {action, index} of this.boardActions.map((action, index) => ({ action, index }))) {
            let existance: Boolean = false;
            for (const user of this.boardUsers) {
                if (user === action.memberCreator.username) {
                    existance = true;
                }
            }
            if (existance === false) {
                this.boardUsers.push(action.memberCreator.username);
            }
        }
    }
}
