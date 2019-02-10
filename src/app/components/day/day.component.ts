import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent {

  constructor() { }

  counter: number = 1;

  nextDay() {
    this.counter++;
  }



}
