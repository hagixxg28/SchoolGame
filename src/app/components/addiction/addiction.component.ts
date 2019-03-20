import { Component, OnInit, Input } from '@angular/core';
import { Addiction } from 'src/app/models/addiction';

@Component({
  selector: 'app-addiction',
  templateUrl: './addiction.component.html',
  styleUrls: ['./addiction.component.css']
})
export class AddictionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.addictionArray[0] = new Addiction('Ciggaretes', 13);
    // this.addictionArray[1] = new Addiction('Alchohol', 20);
  }
  @Input("addictionArray") addictionArray

}
