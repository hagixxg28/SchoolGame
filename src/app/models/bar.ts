export class Bar {
    public constructor(
        public type: string,
        public iconSource: string,
        public value: number,
        public color: string,
        public positive: string,
        public negative: string,
        public previewIcon?: boolean,
        public showPositive?: boolean,
        public showNegative?: boolean,
        public previewIconColor?: string,
        public fontSize?: string,
        public top?: string
    ) { }
}    