import { Injectable } from '@angular/core';
import {Trello} from '../trello/Interfaces/trello.interface';
import Board = Trello.Board;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  boardSelected: Board;
  constructor() { }
}
