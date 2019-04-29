import { dayTimes } from "../enums/dayTimes";
import { Perk } from "../enums/Perks";

export class GameState {
    public constructor(
        public dayNum: number,
        public time: String,
        public perks: Perk[],
        public stressVal: number,
        public socialVal: number,
        public schoolVal: number,
        public parentsVal: number,
    ) { }
}    