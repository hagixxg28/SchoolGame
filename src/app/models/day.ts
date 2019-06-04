import { GameEvent } from "./gameEvent";

export class Day {
    public constructor(
        public morning?: GameEvent,
        public noon?: GameEvent,
        public afternoon?: GameEvent,
        public evening?: GameEvent,
        public night?: GameEvent,
        public dream?: GameEvent,
        public nextDay?: Day,
        public wasPicked?: boolean
    ) { }
}    