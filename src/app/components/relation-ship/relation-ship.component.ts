import { Component, OnInit } from '@angular/core';
import { RelationShip } from 'src/app/models/relationShip';

@Component({
  selector: 'app-relation-ship',
  templateUrl: './relation-ship.component.html',
  styleUrls: ['./relation-ship.component.css']
})
export class RelationShipComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isSingle: boolean = true;

  relationShip: RelationShip;


  setRelationShip(newRelationShip: RelationShip) {
    this.relationShip = newRelationShip;
    this.isSingle = false;
  }

  breakUp() {
    this.relationShip = undefined
    this.isSingle = true;
  }

  mockButton() {
    this.relationShip = new RelationShip("Sarah");
    this.isSingle = false;
  }
}
