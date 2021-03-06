
import { Component, OnInit, ViewChild } from '@angular/core';
import { GameEvent } from 'src/app/models/gameEvent';
import { Choice } from 'src/app/models/choice';
import { Bar } from 'src/app/models/bar';
import { EventsService } from 'src/app/services/events.service';
import { GameManagerService } from 'src/app/services/game-manager.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DayService } from 'src/app/services/day.service';
import { Day } from 'src/app/models/day';
import { dayTimes } from 'src/app/enums/dayTimes';
import { Perk } from 'src/app/enums/Perks';
import { GameState } from 'src/app/models/gameState';
import { GameStateService } from 'src/app/services/game-state.service';
import { MusicService } from 'src/app/services/music.service';
import { PerkObject } from 'src/app/models/perkObject';
import { PerkDataService } from 'src/app/Data/perk-data.service';
import { StatusService } from 'src/app/services/status.service';
import { PreMadeDayService } from 'src/app/services/pre-made-day.service';
import { CardComponent } from '../card/card.component';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-big-test',
  templateUrl: './big-test.component.html',
  styleUrls: ['./big-test.component.css'],
  animations: [
    trigger('backGroundHandler', [
      state('lose', style({ opacity: '1', background: 'linear-gradient(to right, #00416A, #E4E5E6)' })),
      state('high', style({ opacity: '1', background: 'linear-gradient(to right, #2c2d34, #ff5050)' })),
      state('mid-high', style({ opacity: '1', background: 'linear-gradient(to right, #2c2d34, #467a5e)' })),
      state('mid-low', style({ opacity: '1', background: 'linear-gradient(to right, #2c2d34, #242424)' })),
      state('low', style({ opacity: '1', background: 'linear-gradient(to right, #2c2d34, #33ccff)' })),
      state('morning', style({ opacity: '1', background: 'linear-gradient(to top, #B2FEFA, #0ED2F7)' })),
      state('noon', style({ opacity: '1', background: 'linear-gradient(to top, #56CCF2,#2F80ED )' })),
      state('afternoon', style({ opacity: '1', background: 'linear-gradient(to top, #C06C84 ,#6C5B7B , #355C7D )' })),
      state('evening', style({ opacity: '1', background: 'linear-gradient(to top,   #004e92,#000428 )' })),
      state('night', style({ opacity: '1', background: 'linear-gradient(to top,  #243B55, #141E30 )' })),
      state('dream1', style({ opacity: '1', background: 'linear-gradient(to right, #1d4350, #a43931)' })),
      state('dream2', style({ opacity: '1', background: 'linear-gradient(to right, #eecda3, #ef629f)' })),
      state('dream3', style({ opacity: '1', background: 'linear-gradient(to right, #c33764, #1d2671)' })),
      transition('morning<=>noon', animate('1.5s ease-in'))
    ])]
})
export class BigTestComponent implements OnInit {

  constructor(private perkData: PerkDataService, private musicService: MusicService, private eventService: EventsService, private gameManager: GameManagerService, private dayService: DayService, private gameStateService: GameStateService, private statusService: StatusService, private fixedDay: PreMadeDayService, private tutorial: TutorialService) { }

  ngOnInit() {
    this.statusService.ngOnInit()
    this.musicService.ngOnInit()
    this.Bars = this.gameManager.getFirstBars();
    this.eventService.setUpGameEvents();
    this.initGameState();
    this.eventService.eventSorter();
    if (this.tutorial.checkIfTutorial()) {
      this.onTutorial = true;
      this.currentDay = this.tutorial.getTutorial();
      this.pullFromDay();
      return;
    }
    this.buildDay();
    this.pullFromDay();
    if (localStorage.getItem('autoLoad')) {
      localStorage.setItem('autoLoad', JSON.stringify(false))
      this.loadGame()
    }
  }




  @ViewChild('card') card: CardComponent;

  onTutorial = true;
  fadeOut: boolean = false;
  fadeOutUp: boolean = false;
  gameState: GameState;
  loseBoolean: boolean = false;
  showLosePage: boolean = false;
  showCard: boolean = true;
  showBars: boolean = true;
  showGameStatus: boolean = true;
  backGroundState: String = "morning";
  allBarsSum = 0;
  currentDay: Day;
  Bars: Bar[] = [];
  // SecondBars;
  event: GameEvent;
  //#region event methods
  pullNext() {
    let pulledEvent = this.gameManager.pullNextEvent();
    this.event = pulledEvent;
  }

  pullFromDay() {
    if (this.currentDay.morning) {
      this.eventBinder(this.currentDay.morning)
      this.updateGameStateTime()
      this.checkForPerkChoice(this.event.leftChoice)
      this.checkForPerkChoice(this.event.rightChoice)
      this.currentDay.morning = undefined
      return;
    }
    if (this.currentDay.noon) {
      this.event = this.currentDay.noon
      this.updateGameStateTime()
      this.checkForPerkChoice(this.event.leftChoice)
      this.checkForPerkChoice(this.event.rightChoice)
      this.currentDay.noon = undefined
      return;
    }
    if (this.currentDay.midNoon) {
      this.event = this.currentDay.midNoon
      this.checkForPerkChoice(this.event.leftChoice)
      this.checkForPerkChoice(this.event.rightChoice)
      this.currentDay.midNoon = undefined
      return;
    }
    if (this.currentDay.afternoon) {
      this.eventBinder(this.currentDay.afternoon)
      this.updateGameStateTime()
      this.checkForPerkChoice(this.event.leftChoice)
      this.checkForPerkChoice(this.event.rightChoice)
      this.currentDay.afternoon = undefined
      return;
    }
    if (this.currentDay.evening) {
      this.eventBinder(this.currentDay.evening)
      this.updateGameStateTime()
      this.checkForPerkChoice(this.event.leftChoice)
      this.checkForPerkChoice(this.event.rightChoice)
      this.currentDay.evening = undefined
      return;
    }
    if (this.currentDay.night) {
      this.event = this.currentDay.night
      this.updateGameStateTime()
      this.checkForPerkChoice(this.event.leftChoice)
      this.checkForPerkChoice(this.event.rightChoice)
      this.currentDay.night = undefined
      return;
    }
    if (this.currentDay.dream) {
      this.event = this.currentDay.dream
      this.updateGameStateTime()
      this.checkForPerkChoice(this.event.leftChoice)
      this.checkForPerkChoice(this.event.rightChoice)
      this.currentDay.dream = undefined
      return;
    }
    this.perkCountReducer()
    if (this.currentDay.nextDay) {
      this.currentDay = this.currentDay.nextDay
      this.updateGameStateDay();
      this.pullFromDay();
    } else {
      this.updateGameStateDay();
      this.buildDay();
      this.pullFromDay();
    }
  }
  buildDay() {
    if (this.onTutorial) {
      this.onTutorial = false;
      this.tutorial.finishTutorial()
    }
    this.dayService.buildDay();
    this.currentDay = this.dayService.day;
  }

  updateDay() {
    this.eventService.updateEventPool(this.gameState);
    this.dayService.reBuildDay(this.gameState.time)
    this.currentDay = this.dayService.getDay()
  }
  //#endregion
  //#region calculation methods


  //CHOICEMETHOD
  choiceSort(choice: Choice) {

    if (this.loseBoolean) {
      this.fadeOut = true;
      this.backGroundState = 'lose'
      return;
    }

    if (!choice) {
      setTimeout(() => {
        this.pullNext();
      }, 1000);
      return;
    }

    let messageDelay = 0;
    let messageDuration = 400;
    let firstValue
    let secondValue
    let thirdValue
    let fourthValue


    if (choice.perk && this.isValidPerk(this.perkData.PerksMap.get(choice.perk))) {
      let newPerk = this.perkData.PerksMap.get(choice.perk)
      this.addPerk(newPerk);
      if (!newPerk.noRemakeDay) {
        this.updateDay();
      }
    }


    if (choice.stressBarValue) {
      messageDelay += 150;
      firstValue = this.calculate(choice.stressBarValue, 0)
      setTimeout(() => {
        this.setView(firstValue, choice.stressBarValue, 0)
      }, messageDelay);

    }

    if (choice.socialBarValue) {
      messageDelay += messageDuration;
      secondValue = this.calculate(choice.socialBarValue, 1)
      setTimeout(() => {
        this.setView(secondValue, choice.socialBarValue, 1)
      }, messageDelay);
    }

    if (choice.schoolBarValue) {
      messageDelay += messageDuration;
      thirdValue = this.calculate(choice.schoolBarValue, 2);
      setTimeout(() => {
        this.setView(thirdValue, choice.schoolBarValue, 2)
      }, messageDelay);
    }

    if (choice.parentsBarValue) {
      messageDelay += messageDuration;
      fourthValue = this.calculate(choice.parentsBarValue, 3)
      setTimeout(() => {
        this.setView(fourthValue, choice.parentsBarValue, 3)
      }, messageDelay);
    }

    messageDelay += messageDuration;
    //Waiting for animation to end
    if (!this.loseBoolean && !choice.nextEvent && !choice.storedEvent) {
      setTimeout(() => {
        this.pullFromDay(); this.fullyUpdateAndPushGameState(); this.backgroundByDay();
      }, 1000);
      return;
    }
    if (!this.loseBoolean) {
      setTimeout(() => {
        if (choice.storedEvent) {
          this.event = choice.storedEvent
        } else {
          this.event = choice.nextEvent();
        }
        this.fullyUpdateAndPushGameState();
        this.backgroundByDay();
        this.checkForPerkChoice(this.event.leftChoice);
        this.checkForPerkChoice(this.event.rightChoice);
      }, 1000);
    }
  }

  calculate(value: number, index: number) {
    let calculatedValue = 0;


    if (this.Bars[index].value + value <= 0) {
      calculatedValue = 0;
      this.loseAlert(this.Bars[index], calculatedValue)
      return calculatedValue;
    }

    if (this.Bars[index].value + value >= 100) {
      calculatedValue = 100;
      this.loseAlert(this.Bars[index], calculatedValue)
      return calculatedValue;
    }

    calculatedValue = this.Bars[index].value + value;

    return calculatedValue;
  }

  loseAlert(bar: Bar, calculatedValue) {
    if (this.loseBoolean) {
      return;
    }

    if (calculatedValue <= 0 || calculatedValue >= 100) {
      this.loseBoolean = true;
      this.musicService.switchToLose()
      setTimeout(() => {
        this.event = this.gameManager.pullLoseEvent(bar, calculatedValue)
      }, 1000);
      return;
    }
  }

  previewCalculate(value: number, index: number) {

    if (window.matchMedia("(max-width: 800px)").matches) {
      this.previewCalculatePhone(value, index);
      return;
    }
    if (value >= 20) {
      this.Bars[index].fontSize = '42px';
      this.Bars[index].top = "14%"
      this.Bars[index].previewIcon = true;
      return;
    }
    if (value <= 19 && value >= 10) {
      this.Bars[index].fontSize = '32px';
      this.Bars[index].top = "22%"
      this.Bars[index].previewIcon = true;
      return;
    }
    if (value <= 9 && value >= 0) {
      this.Bars[index].fontSize = '28px';
      this.Bars[index].top = "25%"
      this.Bars[index].previewIcon = true;
      return;
    }

    if (value < 0 && value >= -9) {
      this.Bars[index].fontSize = '28px';
      this.Bars[index].top = "25%"
      this.Bars[index].previewIcon = true;
      return;
    }

    if (value <= -10 && value >= -19) {
      this.Bars[index].fontSize = '32px';
      this.Bars[index].top = "22%"
      this.Bars[index].previewIcon = true;
      return;
    }

    if (value <= -20) {
      this.Bars[index].fontSize = '42px';
      this.Bars[index].top = "14%"
      this.Bars[index].previewIcon = true;
      return;
    }
  }

  previewCalculatePhone(value: number, index: number) {
    if (value >= 20) {
      this.Bars[index].fontSize = '38px';
      this.Bars[index].top = "8%"
      this.Bars[index].previewIcon = true;
      return;
    }
    if (value <= 19 && value >= 10) {
      this.Bars[index].fontSize = '32px';
      this.Bars[index].top = "20%"
      this.Bars[index].previewIcon = true;
      return;
    }
    if (value <= 9 && value >= 0) {
      this.Bars[index].fontSize = '24px';
      this.Bars[index].top = "24%"
      this.Bars[index].previewIcon = true;
      return;
    }

    if (value < 0 && value >= -9) {
      this.Bars[index].fontSize = '24px';
      this.Bars[index].top = "24%"
      this.Bars[index].previewIcon = true;
      return;
    }

    if (value <= -10 && value >= -19) {
      this.Bars[index].fontSize = '32px';
      this.Bars[index].top = "20%"
      this.Bars[index].previewIcon = true;
      return;
    }

    if (value <= -20) {
      this.Bars[index].fontSize = '38px';
      this.Bars[index].top = "8%"
      this.Bars[index].previewIcon = true;
      return;
    }
  }

  calculateBarSum() {
    let calculatedSum = 0
    for (let index = 0; index < this.Bars.length; index++) {
      let bar = this.Bars[index];
      calculatedSum += bar.value;
    }
    this.allBarsSum = calculatedSum;
  }




  //#endregion
  //#region view methods

  messageShower(value, index) {
    if (value > 0) {
      this.Bars[index].showPositive = true;
    } else {
      this.Bars[index].showNegative = true;
    }

  }
  messageHider(index) {
    this.Bars[index].showPositive = false;
    this.Bars[index].showNegative = false;
  }
  messagesHider() {
    for (let index = 0; index < this.Bars.length; index++) {
      this.Bars[index].showPositive = false;
      this.Bars[index].showNegative = false;
    }
  }
  setView(calculatedValue: number, dropValue: number, index: number) {
    this.Bars[index].value = calculatedValue;
    this.messageShower(dropValue, index)
    this.colorChanger(index);
    this.calculateBarSum();
    // this.backgroundColorChanger();
    // this.backgroundByDay();
    setTimeout(() => {
      this.messageHider(index);
    }, 1000);
  }
  restBars() {
    for (let index = 0; index < this.Bars.length; index++) {
      let bar = this.Bars[index];
      bar.value = 50;
      this.colorChanger(index);
    }
  }
  choicePreview(choice: Choice) {

    if (!choice) {
      return;
    }

    if (choice.stressBarValue) {
      this.previewCalculate(choice.stressBarValue, 0);
    }

    if (choice.socialBarValue) {
      this.previewCalculate(choice.socialBarValue, 1)
    }

    if (choice.schoolBarValue) {
      this.previewCalculate(choice.schoolBarValue, 2)
    }

    if (choice.parentsBarValue) {
      this.previewCalculate(choice.parentsBarValue, 3)
    }

  }
  //#region color methods
  backgroundColorChanger(currentTime?) {
    if (this.allBarsSum >= 0 && this.allBarsSum <= 160) {
      this.backGroundState = 'low'
      return;
    }

    if (this.allBarsSum >= 161 && this.allBarsSum <= 189) {
      this.backGroundState = 'mid-low'
      return;
    }

    if (this.allBarsSum >= 190 && this.allBarsSum <= 229) {
      this.backGroundState = 'mid-high'
      return;
    }

    if (this.allBarsSum >= 230) {
      this.backGroundState = 'high'
      return;
    }
  }
  backgroundByDay() {
    if (this.event.dayTime === dayTimes.morning) {
      this.backGroundState = 'morning'
      return;
    }
    if (this.event.dayTime === dayTimes.noon) {
      this.backGroundState = 'noon'
      return;
    }
    if (this.event.dayTime === dayTimes.afternoon) {
      this.backGroundState = 'afternoon'
      return;
    }
    if (this.event.dayTime === dayTimes.evening) {
      this.backGroundState = 'evening'
      return;
    }
    if (this.event.dayTime === dayTimes.night) {
      this.backGroundState = 'night'
      return;
    }
    if (this.event.dayTime === dayTimes.dream) {
      this.backGroundState = 'dream1'
      return;
    }
  }
  colorChanger(index: number) {
    if (this.Bars[index].value >= 25 && this.Bars[index].value <= 75) {
      this.Bars[index].color = "primary";
      return;
    }

    if (this.Bars[index].value < 25) {
      this.Bars[index].color = "accent"
      return;
    }

    if (this.Bars[index].value > 75) {
      this.Bars[index].color = "warn"
      return;
    }

  }
  hideColor() {
    for (let index = 0; index < this.Bars.length; index++) {
      this.Bars[index].previewIcon = false;
    }
  }
  //#endregion

  //#endregion

  initGameState() {
    this.gameState = new GameState(1, dayTimes.morning, [], this.Bars[0].value, this.Bars[1].value, this.Bars[2].value, this.Bars[3].value);
    this.pushGameState()
  }

  updateGameStateTime() {
    this.gameState.time = this.event.dayTime;
  }

  updateGameStateDay() {
    this.gameState.dayNum += 1;
  }

  updateGameStateBars() {
    this.gameState.stressVal = this.Bars[0].value;
    this.gameState.socialVal = this.Bars[1].value;
    this.gameState.schoolVal = this.Bars[2].value;
    this.gameState.parentsVal = this.Bars[3].value;
  }



  fullyUpdateAndPushGameState() {
    this.updateGameStateTime();
    this.updateGameStateBars();
    this.pushGameState();
  }


  pushGameState() {
    this.gameStateService.nextGameState(this.gameState)
  }

  fadeOutEnd(event, gameStatusDiv) {
    if (event.target === gameStatusDiv) {
      this.showCard = false;
      this.showGameStatus = false;
      this.fadeOut = false;
      this.fadeOutUp = true;
    }
  }

  fadeOutUpEnd(event, barsRowDiv) {
    if (event.target === barsRowDiv) {
      this.fadeOutUp = false;
      this.showBars = false;
      this.moveToLosePage()
    }
  }

  moveToLosePage() {
    this.showLosePage = true;
  }

  //#region color methods

  checkForPerkChoice(choice: Choice) {
    if (!choice) {
      return;
    }
    if (!choice.perkChoiceMap) {
      return;
    }
    this.gameState.perks.forEach(perk => {

      if (choice.perkChoiceMap.get(perk.perkName)) {
        if (this.event.leftChoice === choice) {
          this.event.leftChoice = choice.perkChoiceMap.get(perk.perkName).choice;
          this.event.leftText = choice.perkChoiceMap.get(perk.perkName).text;
          this.event.isPerkLeft = true;
          return true;
        } else {
          this.event.rightChoice = choice.perkChoiceMap.get(perk.perkName).choice;
          this.event.rightText = choice.perkChoiceMap.get(perk.perkName).text;
          this.event.isPerkRight = true;
          return true;
        }
      }
    });
    if (this.event.leftChoice === choice) {
      this.event.isPerkLeft = false;
    } else {
      this.event.isPerkRight = false;
    }

  }

  perkCountReducer() {
    this.gameState.perks.forEach(perk => {
      perk.daysToRecover--;
      if (perk.daysToRecover === 0) {
        this.removePerk(perk)
      }
    });
  }

  isValidPerk(newPerk: PerkObject): boolean {
    let bool = true;
    this.gameState.perks.forEach(perk => {
      if (perk.perkName == newPerk.perkName) {
        this.renewPerk(perk);
        bool = false;
      }
    });
    return bool;
  }

  addPerk(newPerk: PerkObject) {
    this.gameState.perks.push(newPerk)
  }

  renewPerk(renewedPerk: PerkObject) {
    this.gameState.perks.forEach(perk => {
      if (perk.perkName == renewedPerk.perkName) {
        perk.daysToRecover = this.perkData.PerkRecoverDayMap.get(perk.perkName);
        return;
      }
    });
  }

  removePerk(oldPerk: PerkObject) {
    for (let index = 0; index < this.gameState.perks.length; index++) {
      let perk = this.gameState.perks[index];
      if (perk === oldPerk) {
        this.gameState.perks.splice(index)
        return;
      }
    }
  }

  eventBinder(event: GameEvent): void {
    if (this.onTutorial) {
      this.event = event
      return;
    }
    this.event = this.eventService.getTransitionEvent(event);
    this.event.leftChoice.nextEvent = () => event;
    this.event.rightChoice.nextEvent = () => event;
  }

  //#endregion
  saveGame() {
    this.gameState.day = this.currentDay;
    this.gameState.event = this.event;
    if (this.event.leftChoice.nextEvent) {
      let leftEvent = this.event.leftChoice.nextEvent();
      this.gameState.event.leftChoice.storedEvent = leftEvent;
    }
    if (this.event.rightChoice.nextEvent) {
      let rightEvent = this.event.rightChoice.nextEvent();
      this.gameState.event.rightChoice.storedEvent = rightEvent;
    }

    localStorage.setItem("savedGame", JSON.stringify(this.gameState));
  }

  checkForColorChange() {
    for (let index = 0; index < this.Bars.length; index++) {
      this.colorChanger(index)
    }
  }

  loadGame() {
    let save: GameState = JSON.parse(localStorage.getItem('savedGame'))
    if (save == null) {
      console.log("No saved game")
      return;
    }
    this.gameState = save
    this.event = save.event
    // this.event.leftChoice.nextEvent = () => save.event.leftChoice.nextEvent();
    // this.event.rightChoice.nextEvent = () => save.event.rightChoice.nextEvent();
    this.currentDay = this.gameState.day
    this.Bars[0].value = save.stressVal;
    this.Bars[1].value = save.socialVal;
    this.Bars[2].value = save.schoolVal;
    this.Bars[3].value = save.parentsVal;
    this.pushGameState()
    this.checkForColorChange()
    this.backgroundByDay()
    this.card.setStyle(this.event)
  }

}
