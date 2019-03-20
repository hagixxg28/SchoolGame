import { keyframes, style } from '@angular/animations';
import { Lexer } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { balancePreviousStylesIntoKeyframes } from '@angular/animations/browser/src/util';

// export const swing = [
//     style({ transform: 'rotate3d(0, 0, 1, 15deg)', offset: .2 }),
//     style({ transform: 'rotate3d(0, 0, 1, -10deg)', offset: .4 }),
//     style({ transform: 'rotate3d(0, 0, 1, 5deg)', offset: .6 }),
//     style({ transform: 'rotate3d(0, 0, 1, -5deg)', offset: .8 }),
//     style({ transform: 'none', offset: 1 })
// ]

export const rotateOutUpRight = [
    style({
        transformOrigin: "right  bottom",
        opacity: 1, offset: 0
    }),
    style({
        transformOrigin: "right bottom",
        transform: 'rotate3d(0, 0, 1, 90deg)',
        opacity: 0,
        offset: 1
    })
]
export const rotateOutUpLeft = [
    style({
        transformOrigin: "left bottom",
        opacity: 1, offset: 0
    }),
    style({
        transformOrigin: "left bottom",
        transform: 'rotate3d(0, 0, 1, -45deg)',
        opacity: 0,
        offset: 1
    })
]






// export const wobble = [
//     style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
//     style({ transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)', offset: .15 }),
//     style({ transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)', offset: .3 }),
//     style({ transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)', offset: .45 }),
//     style({ transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)', offset: .6 }),
//     style({ transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)', offset: .75 }),
//     style({ transform: 'translate3d(0, 0, 0)', offset: 1 })
// ]