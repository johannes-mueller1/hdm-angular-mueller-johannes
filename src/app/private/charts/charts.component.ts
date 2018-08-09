import { Component, OnInit } from '@angular/core';
import {TrelloApiService} from '../../trello/trello-api.service';
import {Trello} from '../../trello/Interfaces/trello.interface';
import Board = Trello.Board;
import Action = Trello.Action;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  chart = [];
  boards: Array<Board>;
  actions: Action[];
  types: string[];

  constructor(private api: TrelloApiService) { }

  ngOnInit() {
    this.types = new Array<string>();
    this.actions = new Array<Action>();
      this.api.getBoards().subscribe((resultboards: Array<Board>) => {
          this.boards = resultboards;
          for (let board of this.boards) {
            this.api.getActions(board).subscribe((resultactions: Array<Action>) => {
              for (let action of resultactions) {
                this.actions.push(action);
                let typeexistance: Boolean = false;
                for (let type of this.types) {
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
  }

    public chartType:string = 'line';

    public chartDatasets:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset'}
    ];

    public chartLabels:Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    public chartColors:Array<any> = [
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

    public chartOptions:any = {
        responsive: true
    };
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }
}
