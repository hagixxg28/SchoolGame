import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bar } from 'src/app/models/bar';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.barStyle = {
      'background-image': 'url(' + this.bar.iconSource + ')',
      'background-size': 'cover',
    }
  }

  @Input("bar") bar: Bar;

  @Output() loseEmitter = new EventEmitter();


  barStyle = {
  }

  getPreviewIconColor() {
    let color = '';
    color += this.bar.previewIconColor;
    return color;
  }

  getFontsize() {
    let size = '';
    size += this.bar.fontSize;
    return size;
  }

  getTop() {
    return this.bar.top;
  }

  mockCalculateUp() {
    this.bar.value += 10;
  }

  mockCalculateDown() {
    this.bar.value -= 10;
  }




}
