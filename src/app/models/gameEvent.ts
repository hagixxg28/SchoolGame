import { Character } from "./character";
import { Choice } from "./choice";
import { dayTimes } from "../enums/dayTimes";

export class GameEvent {
    public constructor(
        public character: Character,
        public dayTime: dayTimes,
        public mainText: string,
        public leftText: string,
        public rightText: string,
        public leftChoice?: Choice,
        public rightChoice?: Choice,
        public isPerkRight?: boolean,
        public isPerkLeft?: boolean,
    ) { }
}    