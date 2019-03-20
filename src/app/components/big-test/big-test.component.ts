
import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { GameEvent } from 'src/app/models/gameEvent';
import { Choice } from 'src/app/models/choice';
import { Bar } from 'src/app/models/bar';

@Component({
  selector: 'app-big-test',
  templateUrl: './big-test.component.html',
  styleUrls: ['./big-test.component.css']
})
export class BigTestComponent implements OnInit {

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.Bars = this.testService.getFirstBars();
    // this.SecondBars = this.testService.getSecondBars();
    this.pullNext();
  }

  loseBoolean: boolean = false;


  Bars;

  Addictions = [

  ];
  // SecondBars;
  event: GameEvent;


  pullNext() {
    let pulledEvent = this.testService.pullEvent()
    this.event = pulledEvent;
  }


  choicePreview(choice: Choice) {

    if (!choice) {
      return;
    }

    if (choice.stressBarValue) {
      this.previewCalculate(choice.stressBarValue, 0);
    }

    if (choice.schoolBarValue) {
      this.previewCalculate(choice.schoolBarValue, 1)
    }

    if (choice.socialBarValue) {
      this.previewCalculate(choice.socialBarValue, 2)
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

    if (choice.schoolBarValue) {
      messageDelay += messageDuration;
      secondValue = this.calculate(choice.schoolBarValue, 1)
      setTimeout(() => {
        this.setView(secondValue, choice.schoolBarValue, 1)
      }, messageDelay);
    }

    if (choice.socialBarValue) {
      messageDelay += messageDuration;
      thirdValue = this.calculate(choice.socialBarValue, 2);
      setTimeout(() => {
        this.setView(thirdValue, choice.socialBarValue, 2)
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
      this.Bars[index].background = 'green';
      return;
    }
    if (value <= 19 && value >= 10) {
      this.Bars[index].background = 'darkolivegreen';
      return;
    }
    if (value <= 9 && value >= 0) {
      this.Bars[index].background = 'slategray';
      return;
    }

    if (value < 0 && value >= -9) {
      this.Bars[index].background = 'deeppink';
      return;
    }

    if (value <= -10 && value >= -19) {
      this.Bars[index].background = 'crimson';
      return;
    }

    if (value <= -20) {
      this.Bars[index].background = 'red';
      return;
    }

  }

  hideColor() {
    for (let index = 0; index < this.Bars.length; index++) {
      this.Bars[index].background = "rgb(255, 255, 255)";
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
        this.event = this.testService.loseEventsMap.get(bar.type + "LESS")
      }, 1000);
      return;
    }
    if (calculatedValue >= 100) {
      console.log(bar.type + " is full")
      this.loseBoolean = true;
      setTimeout(() => {
        this.event = this.testService.loseEventsMap.get(bar.type + "FULL")
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


}
