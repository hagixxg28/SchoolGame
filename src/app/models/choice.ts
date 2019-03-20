import { Addiction } from "./addiction";

export class Choice {
    public constructor(
        public stressBarValue?: number,
        public socialBarValue?: number,
        public schoolBarValue?: number,
        public parentsBarValue?: number,
        public addiction?: Addiction
    ) { }
}    