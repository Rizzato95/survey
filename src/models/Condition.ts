import { OperatorType } from './enums/OperatorType';

/**
 * Rappresents a filter single condition.
 */
export class Condition {
    /** The model property */
    public field: string;
    /** The operator */
    public operator: OperatorType;
    /** The filter value */
    public value: any;
    /** The relation type with previous level or previous condition */
    public relationType: string;
    /** The group of condition evaluated at same level */
    public group: Condition[];
    /** Indicates if the condition is selected or not */
    public isSelected: boolean;
    /** Indicates if the condition is new */
    public isNew?: boolean = false;
    /** The list of avaiable operators */
    public operators?: boolean = false;

    /**
     * The condition constructor
     * @param field The field name
     * @param operator The filter operator
     * @param value The filter value
     */
    constructor(field?: string, operator?: OperatorType, value?: any) {
        this.field = field ? field : '';
        this.operator = operator ? operator : OperatorType.Contains;
        this.value = value != undefined ? value : '';

        this.relationType = 'AND';
        this.group = [];
        this.isSelected = false;
    }
}