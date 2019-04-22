import { Addiction } from "./addiction";
import { GameEvent } from "./gameEvent";
import { dayTimes } from "../enums/dayTimes";
import { Perk } from "../enums/Perks";
import { choiceWithText } from "./choiceWithText";

export class Choice {
    public constructor(
        public stressBarValue?: number,
        public socialBarValue?: number,
        public schoolBarValue?: number,
        public parentsBarValue?: number,
        public nextEvent?: GameEvent,
        public perkChoiceMap?: Map<Perk, choiceWithText>,
        public addiction?: Addiction,
        public skipToTime?: dayTimes,
    ) { }
}    