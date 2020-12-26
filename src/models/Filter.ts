import { Condition } from './Condition';
import { Sort } from './Sort';

/**
 * Rappresents a complete filter
 */
export class Filter {
    /** The filter name */
    public name!: string;
    /** The filter description */
    public description!: string;
    /** The filter conditions */
    public conditions: Condition[] = [];
    /** The filter sorting settings */
    public sortingSettings: Sort[] = [];
    /** The filter groupBy settings */
    public groupBySettings: string[] = [];
    /** The component where this filter was created */
    public context!: string;
    /** The unique id inside the array of filters in metadataDto value */
    public id!: number;
    /** Indicates if the filter is the default */
    public isDefault!: boolean;
}
