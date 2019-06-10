import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameState } from 'src/app/models/gameState';
import { Status } from 'src/app/enums/Status';
import { GameStateService } from 'src/app/services/game-state.service';
import { BarService } from 'src/app/services/bar.service';
import { dayTimes } from 'src/app/enums/dayTimes';
import { PerkDataService } from 'src/app/Data/perk-data.service';
import { PerkObject } from 'src/app/models/perkObject';
import { MusicService } from 'src/app/services/music.service';
import { ToggleService } from 'src/app/services/toggle.service';

const PERK_ICON_SIZE = 20;
const DEFAULT_ICON_STYLE = {
  'height': PERK_ICON_SIZE,
  'width': PERK_ICON_SIZE
}
@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.css']
})
export class GameStatusComponent implements OnInit {

  constructor(private music: MusicService, private perkData: PerkDataService, private gameStateService: GameStateService, private barService: BarService, private toggleService: ToggleService) { }

  ngOnInit() {
    this.getState()
    this.mockInitGameState()
    if (this.checkIfHasLoad()) {
      this.showLoad = true;
    }
  }


  @Output()
  saveEmitter = new EventEmitter();
  @Output()
  loadEmitter = new EventEmitter();

  gameState: GameState;
  lastState: GameState;
  muted = true;
  currentStatus = "Normie";
  showLoad = false;

  lastStatus = "";
  lastTime: String = "morning";
  lastDay = 1;

  iconStyle = []
  appearingStatus = true;
  appearingDay = true;
  appearingTime = true;
  appearingPerks = true;

  getState() {
    let ob = this.gameStateService.gameStateObservable
    ob.subscribe(state => { this.subFunction(state) })
  }

  mockInitGameState() {
    this.gameState = new GameState(1, dayTimes.morning, undefined,
      this.barService.getFirstBars()[0].value,
      this.barService.getFirstBars()[1].value,
      this.barService.getFirstBars()[2].value,
      this.barService.getFirstBars()[3].value,
    )

  }

  subFunction(state) {
    this.captureLastState();
    this.gameState = state;
    this.checkChanges();
    this.updateIconStyle();
    this.calculateStatus();
    this.checkStatChange();
  }

  finishedAppearingDay() {
    this.appearingDay = false;
  }
  finishedAppearingTime() {
    this.appearingTime = false;
  }
  finishedAppearingPerks() {
    this.appearingPerks = false;
  }
  finishedAppearingStatus() {
    this.appearingStatus = false;
  }

  resetDay() {
    this.appearingDay = true;
  }
  resetStatus() {
    this.appearingStatus = true;
  }
  resetPerks() {
    this.appearingPerks = true;
  }
  resetTime() {
    this.appearingTime = true;
  }

  setStyleMap() {
    for (let index = 0; index < this.gameState.perks.length; index++) {
      this.iconStyle.push({ 'width': PERK_ICON_SIZE, 'height': PERK_ICON_SIZE })
    }
  }

  updateIconStyle() {
    this.setStyleMap()
  }

  pushNewStatus() {
    this.gameStateService.nextGameState(this.gameState)
  }

  getSize(perk: PerkObject): number {
    let size = PERK_ICON_SIZE * (perk.daysToRecover / this.perkData.PerkRecoverDayMap.get(perk.perkName))
    console.log(size)
    return size;
  }

  calculateStatus() {
    this.lastStatus = this.currentStatus;
    let minVal = Math.min(this.gameState.parentsVal, this.gameState.schoolVal, this.gameState.socialVal, this.gameState.stressVal);
    let maxVal = Math.max(this.gameState.parentsVal, this.gameState.schoolVal, this.gameState.socialVal, this.gameState.stressVal);
    if (maxVal < 60 && minVal > 40) {
      this.currentStatus = Status.Normie;
      return;
    }
    let dominatorVal;
    if (minVal < 100 - maxVal) {
      dominatorVal = minVal
    } else {
      dominatorVal = maxVal
    }

    switch (dominatorVal) {
      case this.gameState.parentsVal:
        if (dominatorVal > 50) {
          this.currentStatus = Status.MommasBoy
        } else {
          this.currentStatus = Status.lilRebel
        }
        break;

      case this.gameState.socialVal:
        if (dominatorVal > 50) {
          this.currentStatus = Status.LocalCeleb
        } else {
          this.currentStatus = Status.TheLoner
        }
        break;

      case this.gameState.schoolVal:
        if (dominatorVal > 50) {
          this.currentStatus = Status.TeachersPet
        } else {
          this.currentStatus = Status.DumbDumb
        }
        break;

      case this.gameState.stressVal:
        if (dominatorVal > 50) {
          this.currentStatus = Status.ManOfStress
        } else {
          this.currentStatus = Status.Chill
        }
        break;
    }
  }

  checkStatChange() {
    if (this.currentStatus !== this.lastStatus) {
      this.resetStatus();
    }
  }

  checkTimeChange() {
    if (this.lastTime !== this.gameState.time) {
      this.lastTime = this.gameState.time
      this.resetTime()
    }
  }
  checkDayChange() {
    if (this.lastDay !== this.gameState.dayNum) {
      this.lastDay = this.gameState.dayNum;
      this.resetDay()
    }
  }
  checkPerksChange() {
    if (this.lastState.perks !== this.gameState.perks) {
      this.resetPerks()
    }
  }

  checkChanges() {
    this.checkTimeChange()
    this.checkDayChange()
    this.checkPerksChange()
  }

  captureLastState() {
    this.lastState = this.gameState;
  }

  muteSound() {
    if (!this.muted) {
      this.music.mute();
      this.muted = true;
    }
  }

  unMuteSound() {
    if (this.muted) {
      this.music.unMute();
      this.muted = false;
    }
  }

  toggleButtons() {
    this.toggleService.toggleButtons()
  }

  saveGame(): void {
    this.saveEmitter.emit();
    this.showLoad = true;
  }

  loadGame(): void {
    this.loadEmitter.emit();
  }

  checkIfHasLoad(): boolean {
    if (JSON.parse(localStorage.getItem('savedGame')) != null) {
      return true;
    }
    return false;
  }
}
