import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import * as kf from './keyframes';
import { GameEvent } from 'src/app/models/gameEvent';
import { SwipeComponent } from '../swipe/swipe.component';
import { DayService } from 'src/app/services/day.service';
import { dayTimes } from 'src/app/enums/dayTimes';
import { ToggleService } from 'src/app/services/toggle.service';
import { HostListener } from '@angular/core';


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
        if (this.checkShort(event.currentValue.leftText)) {
            this.isLeftShortText = true;
        } else if (this.checkLong(event.currentValue.leftText)) {
            this.isLeftLongText = true;
        }
        if (this.checkShort(event.currentValue.rightText)) {
            this.isRightShortText = true;
        } else if (this.checkLong(event.currentValue.leftText)) {
            this.isRightLongText = true;
        }
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.code === "KeyA") {
            this.KeyBoardPreviewLeft();
            return;
        }
        if (event.code === "KeyD") {
            this.KeyBoardPreviewRight()
            return;
        }
    }
    constructor(private sanitizer: DomSanitizer, private dayService: DayService, private toggleService: ToggleService) { }

    @Input("event") event: GameEvent;

    @Output()
    choiceEvent = new EventEmitter();

    @Output()
    choicePreviewEvent = new EventEmitter();

    @Output()
    hideColor = new EventEmitter();

    @ViewChild("swipe")
    private SwipeComponent: SwipeComponent;

    isPressed: boolean = false;
    isHoverLeft: boolean = false;
    isHoverRight: boolean = false;
    isSwipeLeft: boolean = false;
    isSwipeRight: boolean = false;
    isLeftShortText: boolean = false;
    isRightShortText: boolean = false;
    isLeftLongText: boolean = false
    isRightLongText: boolean = false
    //Animation Variables
    textAnim = false;
    nameFade = false;
    occupationFade = false;
    imageAnim = false;
    buttonsAnim = false;
    LeftTextShow = false;
    leftTextFade = false;
    rightTextShow = false;
    rightTextFade = false;


    resetSwipe = false;

    emptyText = "       ";

    showEventText;
    showCharName;
    showCharOccupation;
    showImage;
    showButtons: boolean;
    renderButtons: boolean = true;

    eveningText = false;

    cardStyle = {
    }

    characterImage;

    ngOnInit() {
        this.setStyle()
        this.getToggleInfo()
        if (window.innerWidth < 800) {
            // this.renderButtons = false;
        }
    }




    showTextLeft() {
        if (this.isSwipeRight || this.isSwipeLeft) {
            return;
        }
        this.isHoverRight = false
        this.isHoverLeft = true;
        this.previewChoiceLeft()
    }

    KeyBoardPreviewLeft() {
        if (!this.isHoverLeft) {
            this.hideColor.emit()
            this.showTextLeft();
            this.previewChoiceLeft()
            return;
        }
        this.KeyBoardReset()
        this.SwipeComponent.swipeLeft()
    }
    KeyBoardPreviewRight() {
        if (!this.isHoverRight) {
            this.hideColor.emit()
            this.showTextRight();
            this.previewChoiceRight()
            return;
        }
        this.KeyBoardReset()
        this.SwipeComponent.swipeRight()
    }

    KeyBoardReset() {
        this.isHoverLeft = false
        this.isHoverRight = false;
    }

    hideTextLeft() {
        this.isHoverLeft = false;
        this.hideColor.emit();
    }

    hideTextLeft2() {
        this.leftTextFade = true;
        this.hideColor.emit();
    }
    hideTextLeftEnd(event: AnimationEvent) {
        if (event.animationName == "increase-font") {
            return;
        }
        console.log('hiding left')
        this.leftTextFade = false;
        this.isHoverLeft = false;
    }
    hideTextRight2() {
        this.rightTextFade = true;
        this.hideColor.emit();
    }

    hideTextRightEnd(event: AnimationEvent) {
        if (event.animationName == "increase-font") {
            return;
        }
        console.log('hiding right')
        this.rightTextFade = false;
        this.isHoverRight = false;
    }


    showTextRight() {
        //For a case where your courser reaches the button accidently, we don't want to show button text if you swipe.
        if (this.isSwipeRight || this.isSwipeLeft) {
            return;
        }
        this.isHoverLeft = false
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

    setStyle(event?: GameEvent) {
        if (event) {
            this.cardStyle = {
                'background-color': event.character.backgroundColor
            }
            this.characterImage = this.sanitizer.bypassSecurityTrustResourceUrl(event.character.iconPath)
            return;
        }
        this.cardStyle = {
            'background-color': this.event.character.backgroundColor
        }
        this.characterImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.event.character.iconPath)
    }

    checkShort(text) {
        if (text.length < 15) {
            return true;
        }
        return false;
    }
    checkLong(text) {
        if (text.length > 30) {
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
        this.checkTime()
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


    checkTime() {
        let time: dayTimes = this.event.dayTime;
        let timeNum = this.dayService.dayTimeMap.get(time);
        if (timeNum > 2) {
            this.eveningText = true;
            return;
        }
        this.eveningText = false;
    }

    toggleButtons() {
        console.log('Toggling')
        if (this.renderButtons) {
            this.renderButtons = false;
            return;
        }
        this.renderButtons = true;
    }

    getToggleInfo() {
        const ob = this.toggleService.toggleObservable;
        ob.subscribe(() => this.toggleButtons())
    }

    updateEvent(event: GameEvent) {
        setTimeout(() => {
            this.setStyle(event);
        }, 1000);
    }


}
