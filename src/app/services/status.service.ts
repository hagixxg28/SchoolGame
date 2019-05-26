import { Injectable, OnInit } from '@angular/core';
import { GameStateService } from './game-state.service';
import { GameState } from '../models/gameState';
import { Status } from '../enums/Status';

@Injectable({
  providedIn: 'root'
})
export class StatusService implements OnInit {
  ngOnInit(): void {
    this.getState();
  }

  constructor(private gameStateService: GameStateService) { }

  status;

  getState() {
    let ob = this.gameStateService.gameStateObservable
    ob.subscribe(state => { this.subFunction(state) })
  }

  subFunction(state: GameState) {
    this.calculateStatus(state)
  }


  calculateStatus(state: GameState) {
    let minVal = Math.min(state.parentsVal, state.schoolVal, state.socialVal, state.stressVal);
    let maxVal = Math.max(state.parentsVal, state.schoolVal, state.socialVal, state.stressVal);
    if (maxVal < 60 && minVal > 40) {
      this.status = Status.Normie;
      return;
    }
    let dominatorVal;
    if (minVal < 100 - maxVal) {
      dominatorVal = minVal
    } else {
      dominatorVal = maxVal
    }

    switch (dominatorVal) {
      case state.parentsVal:
        if (dominatorVal > 50) {
          this.status = Status.MommasBoy
        } else {
          this.status = Status.lilRebel
        }
        break;

      case state.socialVal:
        if (dominatorVal > 50) {
          this.status = Status.LocalCeleb
        } else {
          this.status = Status.TheLoner
        }
        break;

      case state.schoolVal:
        if (dominatorVal > 50) {
          this.status = Status.TeachersPet
        } else {
          this.status = Status.DumbDumb
        }
        break;

      case state.stressVal:
        if (dominatorVal > 50) {
          this.status = Status.ManOfStress
        } else {
          this.status = Status.Chill
        }
        break;
    }
  }

  getStatus() {
    return this.status
  }
}
