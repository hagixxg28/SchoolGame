import { Addiction } from "./addiction";
import { GameEvent } from "./gameEvent";
import { dayTimes } from "../enums/dayTimes";
import { Perk } from "../enums/Perks";
import { Choice } from "./choice";

export class choiceWithText {
    public constructor(
        public text: string,
        public choice: Choice
    ) { }
}    