export class Bar {
    public constructor(
        public type: string,
        public iconSource: string,
        public value: number,
        public color: string,
        public positive?: string,
        public negative?: string,
        public showPositive?: boolean,
        public showNegative?: boolean,
        public background?: string,
    ) { }
}    