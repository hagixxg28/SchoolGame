import { dayTimes } from "../enums/dayTimes";
import { Perk } from "../enums/Perks";
import { PerkObject } from "./perkObject";
import { Day } from "./day";
import { GameEvent } from "./gameEvent";

export class GameState {
    public constructor(
        public dayNum: number,
        public time: dayTimes,
        public perks: PerkObject[],
        public stressVal: number,
        public socialVal: number,
        public schoolVal: number,
        public parentsVal: number,
        public status?: string,
        public event?: GameEvent,
        public day?: Day
    ) { }
}    