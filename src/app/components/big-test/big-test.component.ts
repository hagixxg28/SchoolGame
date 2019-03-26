
import { Component, OnInit } from '@angular/core';
import { GameEvent } from 'src/app/models/gameEvent';
import { Choice } from 'src/app/models/choice';
import { Bar } from 'src/app/models/bar';
import { EventsService } from 'src/app/services/events.service';
import { GameManagerService } from 'src/app/services/game-manager.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-big-test',
  templateUrl: './big-test.component.html',
  styleUrls: ['./big-test.component.css'],
  animations: [
    trigger('backGroundHandler', [
      state('high', style({ opacity: '1', background: 'linear-gradient(to right, #2c2d34, #ff5050)' })),
      state('mid-high', style({ opacity: '1', background: 'linear-gradient(to right, #2c2d34, #467a5e)' })),
      state('mid-low', style({ opacity: '1', background: 'linear-gradient(to right, #2c2d34, #242424)' })),
      state('low', style({ opacity: '1', background: 'linear-gradient(to right, #2c2d34, #33ccff)' })),
      transition('0 <=> 1', animate('1000ms ease'))
    ])]
})
export class BigTestComponent implements OnInit {

  constructor(private eventService: EventsService, private gameManager: GameManagerService) { }

  ngOnInit() {
    this.Bars = this.gameManager.getFirstBars();
    this.eventService.setUpGameEvents();
    this.pullNext();
    console.log(this.Bars)

  }

  loseBoolean: boolean = false;
  backGroundState: String = "mid-low";
  allBarsSum = 0;


  Bars;

  Addictions = [

  ];
  // SecondBars;
  event: GameEvent;


  pullNext() {
    let pulledEvent = this.gameManager.pullNextEvent();
    this.event = pulledEvent;
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


  choiceSort(choice: Choice) {

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


    if (choice.addiction) {
      this.Addictions.push(choice.addiction);
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
      console.log(choice.schoolBarValue + " at choice sort")
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
    if (!this.loseBoolean) {
      setTimeout(() => {
        this.pullNext()
      }, 1000);
    }
  }





  setView(calculatedValue: number, dropValue: number, index: number) {
    this.Bars[index].value = calculatedValue;
    this.messageShower(dropValue, index)
    this.colorChanger(index);
    this.calculateBarSum();
    this.backgroundColorChanger();
    setTimeout(() => {
      this.messageHider(index);
    }, 1000);
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

  previewCalculate(value: number, index: number) {
    if (value >= 20) {
      this.Bars[index].previewIconColor = 'rgb(0, 87, 0)';
      this.Bars[index].fontSize = '42px';
      this.Bars[index].top = "12%"
      this.Bars[index].previewIcon = true;
      return;
    }
    if (value <= 19 && value >= 10) {
      this.Bars[index].previewIconColor = 'rgb(8, 168, 34)';
      this.Bars[index].fontSize = '32px';
      this.Bars[index].top = "22%"
      this.Bars[index].previewIcon = true;
      return;
    }
    if (value <= 9 && value >= 0) {
      this.Bars[index].previewIconColor = 'rgb(71, 163, 86)';
      this.Bars[index].fontSize = '28px';
      this.Bars[index].top = "25%"
      this.Bars[index].previewIcon = true;
      return;
    }

    if (value < 0 && value >= -9) {
      this.Bars[index].previewIconColor = 'rgb(238, 75, 107)';
      this.Bars[index].fontSize = '28px';
      this.Bars[index].top = "25%"
      this.Bars[index].previewIcon = true;
      return;
    }

    if (value <= -10 && value >= -19) {
      this.Bars[index].previewIconColor = 'rgb(233, 16, 59)';
      this.Bars[index].fontSize = '32px';
      this.Bars[index].top = "22%"
      this.Bars[index].previewIcon = true;
      return;
    }

    if (value <= -20) {
      this.Bars[index].previewIconColor = 'rgb(180, 6, 41)';
      this.Bars[index].fontSize = '42px';
      this.Bars[index].top = "12%"
      this.Bars[index].previewIcon = true;
      return;
    }



  }

  hideColor() {
    for (let index = 0; index < this.Bars.length; index++) {
      this.Bars[index].previewIcon = false;
    }
  }

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




  loseAlert(bar: Bar, calculatedValue) {
    if (this.loseBoolean) {
      return;
    }

    if (calculatedValue <= 0) {
      console.log(bar.type + " is empty")
      this.loseBoolean = true;
      setTimeout(() => {
        this.event = this.gameManager.pullLoseEvent(bar, calculatedValue)
      }, 1000);
      return;
    }
    if (calculatedValue >= 100) {
      console.log(bar.type + " is full")
      this.loseBoolean = true;
      setTimeout(() => {
        this.event = this.gameManager.pullLoseEvent(bar, calculatedValue)
      }, 1000);
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

  restBars() {
    for (let index = 0; index < this.Bars.length; index++) {
      let bar = this.Bars[index];
      bar.value = 50;
      this.colorChanger(index);
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

  backgroundColorChanger() {
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



}
