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
  UsersActionsCount: number;
  percentageOfActions: number;

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

    public chartType = 'line';

    public chartDatasets: Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset'}
    ];

    public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    public chartColors: Array<any> = [
        {
            backgroundColor: 'rgba(220,220,220,0.2)',
            borderColor: 'rgba(220,220,220,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(220,220,220,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(220,220,220,1)'
        },
        {
            backgroundColor: 'rgba(151,187,205,0.2)',
            borderColor: 'rgba(151,187,205,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(151,187,205,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(151,187,205,1)'
        }
    ];

    public chartOptions: any = {
        responsive: true
    };
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }

    getBoardActions(board_id: string) {
        if (board_id !== 'Select a Board') {
            console.log(board_id);
            console.log('hello');
            this.api.getBoard(board_id).subscribe((result: Board) => {
                this.board = result;
                this.api.getActions(this.board).subscribe((result_action: Array<Action>) => {
                    this.boardActions = result_action;
                    let TempUsersActionCount = 0;
                    for (const action of this.boardActions) {
                        if (action.memberCreator.username === this.me.username) {
                            TempUsersActionCount++;
                        }
                    }
                    this.UsersActionsCount = TempUsersActionCount;
                    console.log(this.UsersActionsCount);
                    this.percentageOfActions = (this.UsersActionsCount / this.boardActions.length) * 100;
                    console.log(this.percentageOfActions);
                    this.getUsersOfBoard();

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
