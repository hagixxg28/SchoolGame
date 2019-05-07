import { Component, OnInit, Input } from '@angular/core';
import { GameState } from 'src/app/models/gameState';
import { Status } from 'src/app/enums/Status';
import { GameStateService } from 'src/app/services/game-state.service';
import { BarService } from 'src/app/services/bar.service';
import { dayTimes } from 'src/app/enums/dayTimes';

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.css']
})
export class GameStatusComponent implements OnInit {

  constructor(private gameStateService: GameStateService, private barService: BarService) { }

  ngOnInit() {
    this.getState()
    this.mockInitGameState()
  }


  gameState: GameState;
  lastState: GameState;

  currentStatus = "Normie";

  lastStatus = "";
  lastTime: String = "morning";
  lastDay = 1;

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
}
