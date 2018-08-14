import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  title: string = 'Angular Project from JM097'
  matnr: string = 'Matrikelnummer: 31231'
  constructor() { }

  ngOnInit() {
  }

}
