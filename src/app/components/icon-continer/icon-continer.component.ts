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

  constructor(private perkData: PerkDataService) { }

  isAfterInit = false;

  @Input("perk")
  perk: PerkObject
  size;

  ngOnInit() {
    this.updateSize()
    this.isAfterInit = true;
  }

  getSize() {
    let divNum = (this.perk.daysToRecover / this.perkData.getRecoverDay(this.perk.perkName))
    let size = PERK_ICON_SIZE * divNum;
    return size;
  }

  updateSize() {
    let newSize = this.getSize()
    this.size = newSize;
  }




}
