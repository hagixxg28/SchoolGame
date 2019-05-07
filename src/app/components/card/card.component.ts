import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import * as kf from './keyframes';
import { GameEvent } from 'src/app/models/gameEvent';
import { SwipeComponent } from '../swipe/swipe.component';

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
export class CardComponent implements OnInit, OnChanges {

    ngOnChanges(changes: SimpleChanges): void {
        const event: SimpleChange = changes.event;
        if (this.checkLength(event.currentValue.leftText)) {
            this.isLeftShortText = true;
        }
        if (this.checkLength(event.currentValue.rightText)) {
            this.isRightShortText = true;
        }
    }

    constructor(private sanitizer: DomSanitizer) { }

    @Input("event") event: GameEvent;

    @Output()
    choiceEvent = new EventEmitter();

    @Output()
    choicePreviewEvent = new EventEmitter();

    @Output()
    hideColor = new EventEmitter();

    @ViewChild("Swipe")
    private SwipeComponent: SwipeComponent;

    isPressed: boolean = false;
    isHoverLeft: boolean = false;
    isHoverRight: boolean = false;
    isSwipeLeft: boolean = false;
    isSwipeRight: boolean = false;
    isLeftShortText: boolean = false;
    isRightShortText: boolean = false;
    //Animation Variables
    textAnim = false;
    nameFade = false;
    occupationFade = false;
    imageAnim = false;
    buttonsAnim = false;

    resetSwipe = false;

    emptyText = "       ";

    showEventText;
    showCharName;
    showCharOccupation;
    showImage;
    showButtons;

    cardStyle = {
    }

    characterImage;

    ngOnInit() {
        this.setStyle()
    }



    showTextLeft() {
        if (this.isSwipeRight || this.isSwipeLeft) {
            return;
        }
        this.isHoverLeft = true;
        this.previewChoiceLeft()
    }

    hideTextLeft() {
        this.isHoverLeft = false;
        this.hideColor.emit();
    }

    showTextRight() {
        //For a case where your courser reaches the button accidently, we don't want to show button text if you swipe.
        if (this.isSwipeRight || this.isSwipeLeft) {
            return;
        }
        this.isHoverRight = true;
        this.previewChoiceRight();
    }

    hideTextRight() {
        this.isHoverRight = false;
        this.hideColor.emit();
    }

    hideSwipeTextLeft() {
        this.isSwipeLeft = false;
        this.hideColor.emit();
    }

    hideSwipeTextRight() {
        this.isSwipeRight = false;
        this.hideColor.emit();
    }

    showSwipeTextRight() {
        //Making the other side false to make sure not to show both texts at the same time
        this.isSwipeLeft = false;
        this.isSwipeRight = true;
        this.previewChoiceRight()
    }

    showSwipeTextLeft() {
        this.isSwipeRight = false;
        this.isSwipeLeft = true;
        this.previewChoiceLeft()
    }

    hideAllText() {
        this.hideTextLeft();
        this.hideTextRight();
        this.hideSwipeTextLeft();
        this.hideSwipeTextRight();
    }



    makeChoiceLeft() {
        this.isPressed = true;
        this.choiceEvent.emit(this.event.leftChoice);
        this.hideColor.emit();
        setTimeout(() => {
            this.setStyle();
            this.isPressed = false;
            this.hideAllText();
            this.resetSwipe = true;
            // Give a bit of time for the new card to kick in, then reset the swipe.
            setTimeout(() => this.resetSwipe = false, 300);
        }, 1000);

    }

    makeChoiceRight() {
        this.isPressed = true;
        this.choiceEvent.emit(this.event.rightChoice);
        this.hideColor.emit();
        setTimeout(() => {
            this.setStyle();
            this.isPressed = false;
            this.hideAllText();
            this.resetSwipe = true;
            // Give a bit of time for the new card to kick in, then reset the swipe.
            setTimeout(() => this.resetSwipe = false, 300);
        }, 1000);

    }


    previewChoiceLeft() {
        this.choicePreviewEvent.emit(this.event.leftChoice);
    }

    previewChoiceRight() {
        this.choicePreviewEvent.emit(this.event.rightChoice);
    }

    setStyle() {
        this.cardStyle = {
            'background-color': this.event.character.backgroundColor
        }
        this.characterImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.event.character.iconPath)
    }

    checkLength(text) {
        if (text.length < 15) {
            return true;
        }
        return false;
    }

    resetAnimCycle() {
        this.imageAnim = true;
    }

    finishedSwipe() {
        //When we finish swiping, we want to hide the event text so they animation of it appearing afterwards will work normally
        this.showEventText = false;
        this.showCharName = false;
        this.showCharOccupation = false;
        this.showImage = false;
        this.showButtons = false;
    }

    finishedAnim() {
        //After finishing the appearing animation we want to set the text's class to it's normal value
        this.textAnim = false;
        this.showEventText = true;
        this.buttonsAnim = true;
    }

    finishedNameAnim() {
        this.nameFade = false;
        this.showCharName = true;
        this.occupationFade = true;
    }

    finishedOccupationAnim() {
        this.occupationFade = false;
        this.showCharOccupation = true;
        this.textAnim = true;
    }
    finishedImageAnim() {
        this.imageAnim = false;
        this.showImage = true;
        this.nameFade = true;
    }

    finishedButtonsAnim() {
        this.buttonsAnim = false;
        this.showButtons = true;
    }

}
