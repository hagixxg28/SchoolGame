import { Injectable, OnInit } from '@angular/core';
import { GameEvent } from '../models/gameEvent';
import { Bar } from '../models/bar';
import { EventsService } from './events.service';
import { BarService } from './bar.service';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  constructor(private eventsService: EventsService, private barService: BarService) { }


  //Game Variables:
  loseBoolean = false;


  //Bar Section-----
  getFirstBars() {
    return this.barService.getFirstBars()
  }
  //---End of bar section



  //Event Section ---------
  pullNextEvent() {
    return this.eventsService.pullEvent();
  }

  pullLoseEvent(bar: Bar, calculatedValue) {

    if (this.loseBoolean) {
      return;
    }

    let loseEvent;
    loseEvent = this.eventsService.pullLoseEvent(bar, calculatedValue);
    this.loseBoolean = true;
    return loseEvent;
  }

  //End of Event Section------

}

