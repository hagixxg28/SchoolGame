import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import * as kf from './keyframes';
import { GameEvent } from 'src/app/models/gameEvent';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => rotateOutUpLeft', animate(1000, keyframes(kf.rotateOutUpLeft))),
      transition('* => rotateOutUpRight', animate(1000, keyframes(kf.rotateOutUpRight))),
    ])
  ]
})
export class CardComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  @Input("event") event: GameEvent;

  @Output()
  choiceEvent = new EventEmitter();

  @Output()
  choicePreviewEvent = new EventEmitter();

  @Output()
  hideColor = new EventEmitter();

  isPressed: boolean = false;

  isHoverLeft: boolean = false;
  isHoverRight: boolean = false;

  emptyText = "       ";

  animationState: string;

  cardStyle = {
  }

  characterImage;

  ngOnInit() {
    this.setStyle()
  }


  showTextLeft() {
    this.isHoverLeft = true;

  }

  hideTextLeft() {
    this.isHoverLeft = false;
    this.hideColor.emit();
  }

  showTextRight() {
    this.isHoverRight = true;
  }

  hideTextRight() {
    this.isHoverRight = false;
    this.hideColor.emit();
  }


  makeChoiceLeft() {
    this.isPressed = true;
    this.choiceEvent.emit(this.event.leftChoice);
    this.hideColor.emit();
    this.startAnimation('rotateOutUpLeft')
    setTimeout(() => {
      this.setStyle(), this.isPressed = false, this.hideAllText();
    }, 1000);

  }



  makeChoiceRight() {

    this.isPressed = true;
    this.choiceEvent.emit(this.event.rightChoice);
    this.hideColor.emit();
    this.startAnimation('rotateOutUpRight')
    setTimeout(() => {
      this.setStyle(), this.isPressed = false, this.hideAllText();
    }, 1000);

  }


  previewChoiceLeft() {
    this.showTextLeft();
    this.choicePreviewEvent.emit(this.event.leftChoice);
  }

  previewChoiceRight() {
    this.showTextRight();
    this.choicePreviewEvent.emit(this.event.rightChoice);
  }

  startAnimation(state) {
    if (!this.animationState) {
      //This if is to make sure you will never have 2 animations at once
      this.animationState = state;
    }

  }

  resetAnimationState() {
    this.animationState = '';
  }

  hideAllText() {
    this.hideTextLeft();
    this.hideTextRight();
  }





  setStyle() {
    this.cardStyle = {
      'background-color': this.event.character.backgroundColor
    }
    this.characterImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.event.character.iconPath)
  }




}


