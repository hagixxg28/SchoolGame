import { Character } from "./character";
import { Choice } from "./choice";

export class GameEvent {
    public constructor(
        public character:Character,
        public mainText: string,
        public leftText: string,
        public rightText: string,
        public leftChoice?: Choice,
        public rightChoice?: Choice,
    ) { }
}    