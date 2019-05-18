import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, ElementRef, OnInit } from '@angular/core';

const SWIPE_MIN_DELTA = 175;
const SWIPE_ROTATION_X_PER_DEG = 20;

@Component({
    selector: 'app-swipe',
    templateUrl: './swipe.component.html',
    styleUrls: ['./swipe.component.css']
})
export class SwipeComponent implements OnChanges, OnInit {
    SWIPE_DISTANCE_WHEN_DONE = 800;

    ngOnInit(): void {
        if (window.innerWidth < 800) {
            console.log("switched distance")
            this.SWIPE_DISTANCE_WHEN_DONE = 260;
        }
    }

    constructor(private elementRef: ElementRef) {

    }

    @Input() resetSwipe: boolean;

    // Preview.
    @Output()
    previewSwipeLeft = new EventEmitter();
    @Output()
    previewSwipeRight = new EventEmitter();
    @Output()
    hidePreviewSwipeLeft = new EventEmitter();
    @Output()
    hidePreviewSwipeRight = new EventEmitter();
    @Output()
    swipeAnimEnd = new EventEmitter();
    @Output()
    appearEnd = new EventEmitter();

    // Actual swipe.
    @Output()
    swipedLeft = new EventEmitter();
    @Output()
    swipedRight = new EventEmitter();

    private x = 0;
    // The translate and rotate style to apply to the card. 
    transformStyle = "";
    // Reseting - a swipe has been canceled and we want to return the card to the center.
    resetting = false;
    // Swiped - prevent anything from happening while the swipe is occurring (like swiping left after swiped right).
    swiped = false;
    // Appearing - indicate the appearing animation to kick in.
    appearing = true;

    ngOnChanges(changes: SimpleChanges): void {
        const { resetSwipe } = changes;
        // If finished choosing - it was true and now it's false.
        if (resetSwipe && resetSwipe.previousValue && !resetSwipe.currentValue) {
            this.hardReset();
        }
    }

    onTouch({ deltaX }: { deltaX: number }) {
        if (!this.swiped) {
            this.updatePreview(deltaX);
            this.x = deltaX;
            this.resetting = false;
            this.updateTransform();
        }
    }

    onTouchEnd() {
        if (!this.swiped) {
            if (this.canSwipeRight()) {
                this.swipeRight();
            } else if (this.canSwipeLeft()) {
                this.swipeLeft();
            } else {
                this.reset();
            }
        }
    }

    canSwipeRight(x = this.x) {
        return x >= SWIPE_MIN_DELTA;
    }

    canSwipeLeft(x = this.x) {
        return x <= -SWIPE_MIN_DELTA;
    }

    updatePreview(newX: number) {
        // First, handle hiding current previews.
        if (this.canSwipeLeft() && !this.canSwipeLeft(newX)) {
            this.hidePreviewSwipeLeft.emit();
        } else if (this.canSwipeRight() && !this.canSwipeRight(newX)) {
            this.hidePreviewSwipeRight.emit();
        }

        // Next, handle showing new previews
        if (!this.canSwipeLeft() && this.canSwipeLeft(newX)) {
            this.previewSwipeLeft.emit();
        } else if (!this.canSwipeRight() && this.canSwipeRight(newX)) {
            this.previewSwipeRight.emit();
        }
    }

    updateTransform() {
        const translate = `translate(${this.x}px)`;
        // This means that the farther the card goes, the more it rotates.
        const deg = this.x / SWIPE_ROTATION_X_PER_DEG;
        const rotate = `rotateZ(${deg}deg)`;
        this.transformStyle = `${translate} ${rotate}`;
    }

    swipeRight() {
        this.x = this.SWIPE_DISTANCE_WHEN_DONE;
        this.swipedRight.emit();
        this.swipedSide();
    }

    swipeLeft() {
        this.x = -this.SWIPE_DISTANCE_WHEN_DONE;
        this.swipedLeft.emit();
        this.swipedSide();
    }

    swipedSide() {
        this.swiped = true;
        this.updateTransform();
    }

    finishedAppearing(event) {
        if (event.animationName == "appear") {
            this.appearing = false;

            this.appearEnd.emit();
        }
    }

    reset() {
        this.resetting = true;
        this.x = 0;
        this.updateTransform();
    }

    hardReset() {
        this.x = 0;
        this.swiped = false;
        this.resetting = false;
        this.appearing = true;
        this.updateTransform();
    }

    finishedSwiping(event, swipeDiv) {
        if (event.target === swipeDiv && event.propertyName === "transform" && (this.x == this.SWIPE_DISTANCE_WHEN_DONE || this.x == -this.SWIPE_DISTANCE_WHEN_DONE)) {
            this.swipeAnimEnd.emit();
        }
    }

}
