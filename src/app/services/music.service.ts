import { Injectable, OnInit } from '@angular/core';
import { Howl, Howler } from 'howler';
import { GameStateService } from './game-state.service';
import { GameState } from '../models/gameState';
import { dayTimes } from '../enums/dayTimes';

@Injectable({
  providedIn: 'root'
})
export class MusicService implements OnInit {

  constructor(private gameStateService: GameStateService) { }

  ngOnInit(): void {
    this.getState();
    this.playMusic();
  }

  playMusic() {
    this.morningSound.play();
    this.currentSound = this.morningSound;
  }

  dayTimeMap = new Map([
    [dayTimes.morning, 1],
    [dayTimes.noon, 2],
    [dayTimes.afternoon, 3],
    [dayTimes.evening, 4],
    [dayTimes.night, 5],
    [dayTimes.dream, 6],
  ])
  currentState: GameState;
  currentSound: Howl;

  morningSound = new Howl({
    src: ['../assets/sounds/background/morning.mp3'],
    loop: true
  });


  eveningSound = new Howl({
    src: ['../assets/sounds/background/night.mp3'],
    loop: true
  });

  loseSound = new Howl({
    src: ['../assets/sounds/background/lost.mp3'],
    loop: true
  });

  switchSound(sound: Howl) {
    this.currentSound.fade(1, 0, 2500);
    setTimeout(() => {
      sound.play()
      sound.fade(0, 1, 1500)
      this.currentSound.stop();
      this.currentSound = sound;
    }, 2000);
  }
  getState() {
    let ob = this.gameStateService.gameStateObservable
    ob.subscribe(state => { this.subFunction(state) })
  }
  subFunction(state) {
    this.currentState = state;
    this.checkForSwitch();
  }
  checkForSwitch() {
    if (this.currentState.time == dayTimes.afternoon) {
      this.switchSound(this.eveningSound);
      return;
    }
    if (this.currentState.time == dayTimes.morning && this.currentState.dayNum > 1) {
      this.switchSound(this.morningSound);
      return;
    }
  }
  switchToLose() {
    this.switchSound(this.loseSound);
  }


}