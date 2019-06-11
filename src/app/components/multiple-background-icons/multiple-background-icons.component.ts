import { Component, OnInit } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state.service';
import { IconMapService } from 'src/app/Data/icon-map.service';
import { iconAnimator } from 'src/app/models/iconAnimator';
import { GameState } from 'src/app/models/gameState';
import { Perk } from 'src/app/enums/Perks';
import { Status } from 'src/app/enums/Status';
import { StatusService } from 'src/app/services/status.service';

const NUM_OF_ICONS = 5;
const DELAY_BETWEEN_ICONS = 2000;

@Component({
  selector: 'app-multiple-background-icons',
  templateUrl: './multiple-background-icons.component.html',
  styleUrls: ['./multiple-background-icons.component.css']
})
export class MultipleBackgroundIconsComponent implements OnInit {

  constructor(private gameStateService: GameStateService, private iconURLMap: IconMapService, private statusService: StatusService) { }

  iconAnimArray: iconAnimator[] = []

  animStarted = false;

  iconArray = [];

  ngOnInit() {
    this.iconSetup();
    this.getState()
  }

  getState() {
    let ob = this.gameStateService.gameStateObservable
    ob.subscribe(state => { this.subFunction(state) })
  }

  iconSetup() {
    for (let index = 0; index < NUM_OF_ICONS; index++) {
      this.iconAnimArray[index] = new iconAnimator(false)
    }
  }

  animStarter() {
    if (this.animStarted) {
      return;
    }
    this.animStarted = true;
    for (let index = 0; index < NUM_OF_ICONS; index++) {
      let iconAnim = this.iconAnimArray[index];
      setTimeout(() => {
        this.startAnimIcon(iconAnim)
      }, DELAY_BETWEEN_ICONS * index);
    }
  }

  startAnimIcon(iconAnim: iconAnimator) {
    iconAnim.iconURL = this.getRandomIconURL();
    iconAnim.posX = this.getRandomX();
    iconAnim.posY = this.getRandomY();
    iconAnim.animationBool = true;
  }

  subFunction(state: GameState) {
    this.resetArray()
    setTimeout(() => {
      this.fillArray(state)
      this.animStarter()
    }, 0);
  }

  fillArray(state: GameState) {
    this.iconArray[0] = (this.statusService.getStatus());
    state.perks.forEach(perk => {
      this.iconArray.push(perk.perkName)
    });
  }

  getRandomX(): number {
    let position = Math.floor(Math.random() * 91);
    while (position >= 30 && position <= 65) {
      position = Math.floor(Math.random() * 91);
    }
    return position
  }

  getRandomY(): number {
    let position = Math.floor(Math.random() * 61) + 15;
    return position
  }

  getRandomIconURL(): string {
    let iconName = this.pullRandomIcon();
    let iconURL = this.iconURLMap.getIconURL(iconName)
    return iconURL;
  }

  getSpecificX(index: number): number {
    return this.iconAnimArray[index].posX
  }
  getSpecificY(index: number): number {
    return this.iconAnimArray[index].posY
  }

  pullRandomIcon(): Perk | Status {
    let iconName = this.iconArray[Math.floor(Math.random() * this.iconArray.length)];
    return iconName;
  }

  restartAnim(event, index) {
    if (event.animationName === "fadeIn-Out") {
      let animIcon = this.iconAnimArray[index]
      animIcon.animationBool = false;
      setTimeout(() => {
        this.startAnimIcon(animIcon)
      }, 0);
    }
  }

  resetArray() {
    this.iconArray = []
  }

}
