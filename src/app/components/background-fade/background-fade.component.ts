import { Component, OnInit } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state.service';
import { GameState } from 'src/app/models/gameState';
import { IconMapService } from 'src/app/Data/icon-map.service';
import { Status } from 'src/app/enums/Status';
import { Perk } from 'src/app/enums/Perks';
import { iconAnimator } from 'src/app/models/iconAnimator';
import { StatusService } from 'src/app/services/status.service';



@Component({
  selector: 'app-background-fade',
  templateUrl: './background-fade.component.html',
  styleUrls: ['./background-fade.component.css']
})
export class BackgroundFadeComponent implements OnInit {

  constructor(private gameStateService: GameStateService, private iconURLMap: IconMapService, private statusService: StatusService) { }

  ngOnInit() {
    this.getState();
  }


  iconArray = [];

  iconAnimArray: iconAnimator[] = []

  currentIcon: string;
  icon_x_location: number;
  icon_y_location: number;
  fadeAnimation = false;

  getState() {
    let ob = this.gameStateService.gameStateObservable
    ob.subscribe(state => { this.subFunction(state) })
  }



  startAnimIcon(iconAnim: iconAnimator) {
    iconAnim.iconURL = this.getRandomIconURL();
    iconAnim.posX = this.getRandomX();
    iconAnim.posY = this.getRandomY();
    iconAnim.animationBool = true;
  }



  subFunction(state: GameState) {
    this.resetArray()
    this.fillArray(state)
    this.showNext()
  }

  fillArray(state: GameState) {
    this.iconArray[0] = (this.statusService.getStatus());
    state.perks.forEach(perk => {
      this.iconArray.push(perk.perkName)
    });
  }

  getPosition() {
    let position = Math.floor(Math.random() * 81);
    return position;
  }

  setX() {
    let position = Math.floor(Math.random() * 91);
    while (position >= 30 && position <= 65) {
      position = Math.floor(Math.random() * 91);
    }
    this.icon_x_location = position;
  }

  setY() {
    let position = Math.floor(Math.random() * 61) + 15;
    this.icon_y_location = position
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

  getPositionY(): number {
    return this.icon_y_location;
  }
  getPositionX(): number {
    return this.icon_x_location;
  }

  getRandomIconURL(): string {
    let iconName = this.pullRandomIcon();
    let iconURL = this.iconURLMap.getIconURL(iconName)
    return iconURL;
  }

  iconSetter(iconName: Perk | Status) {
    let iconURL = this.iconURLMap.getIconURL(iconName)
    if (!iconURL) {
      return;
    }
    this.currentIcon = iconURL;
    this.setX();
    this.setY();
    console.log(this.icon_x_location, this.icon_y_location)
    this.fadeAnimation = true;
  }

  pullRandomIcon(): Perk | Status {
    console.log("this be array", this.iconArray)
    let iconName = this.iconArray[Math.floor(Math.random() * this.iconArray.length)];
    return iconName;
  }

  showNext() {
    let iconName = this.pullRandomIcon()
    if (!iconName || this.fadeAnimation) {
      return;
    }
    this.iconSetter(iconName)
  }

  checkIfValidEnd(event, iconImage) {
    if (event.animationName === "fadeIn-Out") {
      this.fadeAnimation = false;
      setTimeout(() => {
        this.showNext();
      }, 0);
    }
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
