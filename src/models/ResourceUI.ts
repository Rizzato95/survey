/** Import base entity */
import { BaseEntity } from './BaseEntity';

/**
 * The class used to show a word inside the ui
 */
export class ResourceUI extends BaseEntity {
    /** The resource key */
    public resourceKey!: string;
    /** The resource context */
    public resourceContext = '';
    /** The resource name (for files) */
    public name?: string;
    /** The resource type */
    public type?: string;
    /** The resource string value if string */
    public stringValue = '';
    /** The resource value if file */
    public binaryValue: any;

    constructor(resourceKey: string, stringValue: string, type?: string, name?: string, binaryValue?: any) {
        super();
        this.resourceKey = resourceKey;
        this.stringValue = stringValue;
        this.type = type;
        this.name = name;
        this.binaryValue = binaryValue;
    }
}
