import { dayTimes } from "../enums/dayTimes";
import { Perk } from "../enums/Perks";
import { PerkObject } from "./perkObject";

export class GameState {
    public constructor(
        public dayNum: number,
        public time: dayTimes,
        public perks: PerkObject[],
        public stressVal: number,
        public socialVal: number,
        public schoolVal: number,
        public parentsVal: number,
    ) { }
}    