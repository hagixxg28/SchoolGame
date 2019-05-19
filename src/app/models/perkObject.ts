import { Perk } from "../enums/Perks";

export class PerkObject {
    public constructor(
        public perkName: Perk,
        public daysToRecover: number,
    ) { }
}    