import { Component, OnInit, Input } from '@angular/core';
import { Addiction } from 'src/app/models/addiction';
import { RelationShip } from 'src/app/models/relationShip';

@Component({
  selector: 'app-day-with-target',
  templateUrl: './day-with-target.component.html',
  styleUrls: ['./day-with-target.component.css']
})
export class DayWithTargetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //Recieve the target Value from another component.
    //Recieve the text for everything like (days addicted etc.)
    if (this.object && this.object instanceof Addiction) {
      this.targetValue = this.object.daysToRecover;
      this.daysToTarget = this.targetValue;
      this.Text1 = "Days addicted";
      this.Text2 = "Days without " + this.object.name;
      this.Text3 = "Days to clean off addiction"
    }
    if (this.object && this.object instanceof RelationShip) {
      this.targetValue = undefined;
      this.Text1 = "Spouse Name:" + this.object.spouseName;
      this.Text2 = "Days In RelationShip: ";
      this.Text3 = undefined;
      this.daysExisted = undefined;
      this.dayCounter = 1;
    }
  }

  @Input("object") object: Object;

  targetValue: number;
  daysToTarget: number;
  dayCounter: number = 0;
  daysExisted: number = 1;

  Text1: string;
  Text2: string;
  Text3: string;

  nextDay() {
    this.dayCounter++;
    this.daysToTarget--;
    this.daysExisted++;
  }

  calculateDaysLeft() {
    this.daysToTarget = this.targetValue - this.dayCounter;
  }

  resetCounter() {
    this.daysExisted++;
    this.dayCounter = 0;
    this.daysToTarget = this.targetValue;
  }


}
