import { SortMode } from './SortMode';
import { SortOptions } from './SortOptions';
/**
 * Rappresents a sorting setting for a single grid column
 */
export class Sort {
    /** The model property */
    public field!: string;
    /** The sorting mode, default ASC */
    public mode: SortMode = SortOptions.ASC;
}