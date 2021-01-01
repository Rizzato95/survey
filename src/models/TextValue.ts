/**
 * The TextValue class
 */
export class TextValue {
    public text!: string;
    public value!: any;

    constructor(text?: string, value?: any) {
        if (text !== undefined && text !== null)
            this.text = text;

        if (value !== undefined && value !== null)
            this.value = value;
    }
}
