import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameState } from '../models/gameState';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor() { }


  public gameStateObservable = new Subject<GameState>();

  nextGameState(state) {
    console.log("I recieved this: ")
    console.log(state)
    this.gameStateObservable.next(state);
  }
}