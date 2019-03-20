import { Component, OnInit, Input } from '@angular/core';
import { Addiction } from 'src/app/models/addiction';

@Component({
  selector: 'app-addiction-info',
  templateUrl: './addiction-info.component.html',
  styleUrls: ['./addiction-info.component.css']
})
export class AddictionInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input("addiction") addiction:Addiction;
}
