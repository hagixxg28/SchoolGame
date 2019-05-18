import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { Day } from '../models/day';
import { dayTimes } from '../enums/dayTimes';
import { GameEvent } from '../models/gameEvent';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(private eventService: EventsService) { }

  day: Day = new Day();
  hasMorning = true;
  hasNoon = true;
  hasAfternoon = true;
  hasEvening = true;
  hasNight = false;
  hasDream = false;

  dayMap = new Map<String, GameEvent>([])

  dayTimeMap = new Map([
    [dayTimes.morning, 1],
    [dayTimes.noon, 2],
    [dayTimes.afternoon, 3],
    [dayTimes.evening, 4],
    [dayTimes.night, 5],
    [dayTimes.dream, 6],
  ])

  reverseDayTimeMap = new Map([
    [1, this.day.morning],
    [2, this.day.noon],
    [3, this.day.afternoon],
    [4, this.day.evening],
    [5, this.day.night],
    [6, this.day.dream],
  ])



  buildDay() {
    this.day = new Day();
    this.rollForDream();
    this.rollForNight();
    if (this.hasMorning) {
      this.pickMorningEvent();
    }
    if (this.hasNoon) {
      this.pickNoonEvent();
    }
    if (this.hasAfternoon) {
      this.pickAfteroonEvent();
    }
    if (this.hasEvening) {
      this.pickEveningEvent();
    }
    if (this.hasNight) {
      this.pickNightEvent();
    }
    if (this.hasDream) {
      this.pickDreamEvent();
    }
  }

  rollForNight() {
    let randomNumber = Math.floor((Math.random() * 100))
    if (randomNumber < 75) {
      this.hasNight = true;
      return;
    }
    this.hasNight = false;
    this.day.night = undefined;
  }

  rollForDream() {
    let randomNumber = Math.floor((Math.random() * 100))
    if (randomNumber < 50) {
      this.hasDream = true;
      return;
    }
    this.hasDream = false;
    this.day.dream = undefined;
  }

  pickMorningEvent() {
    let potentialEvent = this.eventService.pullMorningEvent();
    //Null checker....
    if (!(this.dayMap.get('morning'))) {
      this.dayMap.set('morning', potentialEvent);
      this.day.morning = potentialEvent;
      return;
    }

    while (this.isValidEvent(dayTimes.morning, potentialEvent)) {
      potentialEvent = this.eventService.pullMorningEvent();
    }
    this.dayMap.set('morning', potentialEvent);
    this.day.morning = potentialEvent;
  }

  pickNoonEvent() {
    let potentialEvent = this.eventService.pullNoonEvent();
    if (!(this.dayMap.get('noon'))) {
      this.dayMap.set('noon', potentialEvent);
      this.day.noon = potentialEvent;
      return;
    }

    while (this.isValidEvent(dayTimes.noon, potentialEvent)) {
      potentialEvent = this.eventService.pullNoonEvent();
    }
    this.dayMap.set('noon', potentialEvent);
    this.day.noon = potentialEvent;
  }

  pickAfteroonEvent() {
    let potentialEvent = this.eventService.pullAfternoonEvent();
    if (!(this.dayMap.get('afternoon'))) {
      this.dayMap.set('afternoon', potentialEvent);
      this.day.afternoon = potentialEvent;
      return;
    }
    while (this.isValidEvent(dayTimes.afternoon, potentialEvent)) {
      potentialEvent = this.eventService.pullAfternoonEvent();
    }
    this.dayMap.set('afternoon', potentialEvent);
    this.day.afternoon = potentialEvent;
  }

  pickEveningEvent() {
    let potentialEvent = this.eventService.pullEveningEvent();
    if (!(this.dayMap.get('evening'))) {
      this.dayMap.set('evening', potentialEvent);
      this.day.evening = potentialEvent;
      return;
    }
    while (this.isValidEvent(dayTimes.evening, potentialEvent)) {
      potentialEvent = this.eventService.pullEveningEvent();
    }
    this.dayMap.set('evening', potentialEvent);
    this.day.evening = potentialEvent;
  }

  pickNightEvent() {
    let potentialEvent = this.eventService.pullNightEvent();
    if (!(this.dayMap.get('night'))) {
      this.dayMap.set('night', potentialEvent);
      this.day.night = potentialEvent;
      return;
    }
    while (this.isValidEvent(dayTimes.night, potentialEvent)) {
      potentialEvent = this.eventService.pullNightEvent();
    }
    this.dayMap.set('night', potentialEvent);
    this.day.night = potentialEvent;
  }

  pickDreamEvent() {
    let potentialEvent = this.eventService.pullDreamEvent();
    if (!(this.dayMap.get('dream'))) {
      this.dayMap.set('dream', potentialEvent);
      this.day.dream = potentialEvent;
      return;
    }
    while (this.isValidEvent(dayTimes.dream, potentialEvent)) {
      potentialEvent = this.eventService.pullDreamEvent();
    }
    this.dayMap.set('dream', potentialEvent);
    this.day.dream = potentialEvent;
  }


  buildAndShowDay() {
    this.buildDay();
  }

  timeSkipper(currentTimeNumber: number, targetTimeNumber: number) {
    if (currentTimeNumber < targetTimeNumber) {
      for (let index = currentTimeNumber; index < targetTimeNumber; index++) {
        this.dayCleanerSwitch(index)
      }
      return;
    }
    for (let index = targetTimeNumber; index > currentTimeNumber; index--) {
      this.dayCleanerSwitch(index)
    }
  }


  changeDayCourse(currentTime, targetTime) {
    let currentTimeNumber = this.dayTimeMap.get(currentTime)
    let targetTimeNumber = this.dayTimeMap.get(targetTime)
    this.timeSkipper(currentTimeNumber, targetTimeNumber)
  }

  dayCleanerSwitch(index) {
    switch (index) {
      case 1:
        this.day.morning = undefined;
        break;

      case 2:
        this.day.noon = undefined;
        break;

      case 3:
        this.day.afternoon = undefined
        break;

      case 4:
        this.day.evening = undefined
        break;

      case 5:
        this.day.night = undefined
        break;

      case 6:
        this.day.dream = undefined
        break;
    }
  }

  isValidEvent(dayTime, event) {
    switch (dayTime) {
      case dayTimes.morning:
        if (this.dayMap.get('morning') === event || this.dayMap.get('morning').character === event.character) {
          return true;
        }
        break;

      case dayTimes.noon:
        if (this.dayMap.get('noon') === event || this.dayMap.get('noon').character === event.character) {
          return true;
        }
        break;

      case dayTimes.afternoon:
        if (this.dayMap.get('afternoon') === event || this.dayMap.get('afternoon').character === event.character) {
          return true;
        }
        break;

      case dayTimes.evening:
        if (this.dayMap.get('evening') === event || this.dayMap.get('evening').character === event.character) {
          return true;
        }
        break;

      case dayTimes.night:
        if (this.dayMap.get('night') === event || this.dayMap.get('night').character === event.character) {
          return true;
        }
        break;

      case dayTimes.dream:
        if (this.dayMap.get('dream') === event || this.dayMap.get('dream').character === event.character) {
          return true;
        }
        break;
    }
    return false;
  }

  reBuildDay(currentTime) {
    this.buildAndShowDay()
    let currentTimeNumber = this.dayTimeMap.get(currentTime);
    let targetTimeNumber = currentTimeNumber + 1;
    this.timeSkipper(currentTimeNumber, targetTimeNumber)
  }

}
