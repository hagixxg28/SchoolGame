import { Component, OnInit, Input } from '@angular/core';
import { PerkObject } from 'src/app/models/perkObject';
import { PerkDataService } from 'src/app/Data/perk-data.service';

const PERK_ICON_SIZE = 20;

@Component({
  selector: 'app-icon-continer',
  templateUrl: './icon-continer.component.html',
  styleUrls: ['./icon-continer.component.css']
})
export class IconContinerComponent implements OnInit {

  constructor() { }

  isAfterInit = false;

  @Input("perk")
  perk: PerkObject
  totalRecoverDays: number

  size;

  ngOnInit() {
    this.totalRecoverDays = this.perk.daysToRecover
    this.updateSize()
    // this.setStyle()
    this.isAfterInit = true;
  }

  ngOnChanges() {
    if (this.isAfterInit) {
      // this.updateStyle();
      this.updateSize()
    }
  }

  // setStyle(size?) {
  //   if (!size) {
  //     this.iconStyle = {
  //       'height': PERK_ICON_SIZE,
  //       'width': PERK_ICON_SIZE
  //     }
  //     console.log(this.iconStyle)
  //     return;
  //   }
  //   this.iconStyle = {
  //     'height': size,
  //     'width': size
  //   }
  //   console.log(this.iconStyle)
  // }

  // updateStyle() {
  //   let size = this.getNewSize();
  //   this.setStyle(size);
  // }

  getSize() {
    let divNum = (this.perk.daysToRecover / this.totalRecoverDays)
    let size = PERK_ICON_SIZE * divNum;
    return size;
  }

  updateSize() {
    let newSize = this.getSize()
    this.size = newSize;
  }

}
