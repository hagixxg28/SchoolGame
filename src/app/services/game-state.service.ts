import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameState } from '../models/gameState';
import { Status } from '../enums/Status';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor() { }


  public gameStateObservable = new Subject<GameState>();

  nextGameState(state) {
    this.gameStateObservable.next(state);
  }


}
