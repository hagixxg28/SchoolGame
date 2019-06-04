import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { Day } from '../models/day';
import { dayTimes } from '../enums/dayTimes';
import { GameEvent } from '../models/gameEvent';
import { PreMadeDayService } from './pre-made-day.service';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(private eventService: EventsService, private preMadeDayService: PreMadeDayService) { }

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



  buildDay(currentTime?) {
    if (this.rollForPreMadeDay()) {
      let potentialDay = this.preMadeDayService.pullRandomDay();
      if (potentialDay != null) {
        this.day = potentialDay
        return;
      }
    }
    this.day = new Day();
    this.rollForDream();
    this.rollForNight();
    if (this.hasMorning) {
      this.pickMorningEvent(currentTime);
    }
    if (this.hasNoon) {
      this.pickNoonEvent(currentTime);
    }
    if (this.hasAfternoon) {
      this.pickAfteroonEvent(currentTime);
    }
    if (this.hasEvening) {
      this.pickEveningEvent(currentTime);
    }
    if (this.hasNight) {
      this.pickNightEvent(currentTime);
    }
    if (this.hasDream) {
      this.pickDreamEvent(currentTime);
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

  rollForPreMadeDay() {
    let randomNumber = Math.floor((Math.random() * 100))
    console.log(randomNumber)
    if (randomNumber < 33) {
      return true;
    }
    return false;
  }

  pickMorningEvent(currentTime?) {
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
    this.day.morning = potentialEvent;
    if (currentTime > 1) {
      //Cutting the sequence and not refreshing the map if you added a perk, in order to make the illusion we did not rebuild the day
      return;
    }
    this.dayMap.set('morning', potentialEvent);
  }

  pickNoonEvent(currentTime?) {
    let potentialEvent = this.eventService.pullNoonEvent();
    if (!(this.dayMap.get('noon'))) {
      this.dayMap.set('noon', potentialEvent);
      this.day.noon = potentialEvent;
      return;
    }

    while (this.isValidEvent(dayTimes.noon, potentialEvent)) {
      potentialEvent = this.eventService.pullNoonEvent();
    }
    this.day.noon = potentialEvent;
    if (currentTime > 2) {
      //Cutting the sequence and not refreshing the map if you added a perk, in order to make the illusion we did not rebuild the day
      return;
    }
    this.dayMap.set('noon', potentialEvent);
  }

  pickAfteroonEvent(currentTime?) {
    let potentialEvent = this.eventService.pullAfternoonEvent();
    if (!(this.dayMap.get('afternoon'))) {
      this.dayMap.set('afternoon', potentialEvent);
      this.day.afternoon = potentialEvent;
      return;
    }
    while (this.isValidEvent(dayTimes.afternoon, potentialEvent)) {
      potentialEvent = this.eventService.pullAfternoonEvent();
    }
    this.day.afternoon = potentialEvent;
    if (currentTime > 3) {
      //Cutting the sequence and not refreshing the map if you added a perk, in order to make the illusion we did not rebuild the day
      return;
    }
    this.dayMap.set('afternoon', potentialEvent);
  }

  pickEveningEvent(currentTime?) {
    let potentialEvent = this.eventService.pullEveningEvent();
    if (!(this.dayMap.get('evening'))) {
      this.dayMap.set('evening', potentialEvent);
      this.day.evening = potentialEvent;
      return;
    }
    while (this.isValidEvent(dayTimes.evening, potentialEvent)) {
      potentialEvent = this.eventService.pullEveningEvent();
    }
    this.day.evening = potentialEvent;
    if (currentTime > 4) {
      //Cutting the sequence and not refreshing the map if you added a perk, in order to make the illusion we did not rebuild the day
      return;
    }
    this.dayMap.set('evening', potentialEvent);
  }

  pickNightEvent(currentTime?) {
    let potentialEvent = this.eventService.pullNightEvent();
    if (!(this.dayMap.get('night'))) {
      this.dayMap.set('night', potentialEvent);
      this.day.night = potentialEvent;
      return;
    }
    while (this.isValidEvent(dayTimes.night, potentialEvent)) {
      potentialEvent = this.eventService.pullNightEvent();
    }
    this.day.night = potentialEvent;
    if (currentTime > 5) {
      //Cutting the sequence and not refreshing the map if you added a perk, in order to make the illusion we did not rebuild the day
      return;
    }
    this.dayMap.set('night', potentialEvent);
  }

  pickDreamEvent(currentTime?) {
    let potentialEvent = this.eventService.pullDreamEvent();
    if (!(this.dayMap.get('dream'))) {
      this.dayMap.set('dream', potentialEvent);
      this.day.dream = potentialEvent;
      return;
    }
    while (this.isValidEvent(dayTimes.dream, potentialEvent)) {
      potentialEvent = this.eventService.pullDreamEvent();
    }
    this.day.dream = potentialEvent;
    if (currentTime > 6) {
      //Cutting the sequence and not refreshing the map if you added a perk, in order to make the illusion we did not rebuild the day
      return;
    }
    this.dayMap.set('dream', potentialEvent);
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
    let currentTimeNum: number = this.dayTimeMap.get(currentTime)
    this.buildDay(currentTimeNum)
    let currentTimeNumber = this.dayTimeMap.get(currentTime);
    let targetTimeNumber = currentTimeNumber + 1;
    this.timeSkipper(currentTimeNumber, targetTimeNumber)
  }


  getDay() {
    return this.day
  }
}
