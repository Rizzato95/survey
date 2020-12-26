import { SortMode } from './SortMode';

/**
 * Rappresents a sorting mode
 */
export class SortOptions {
    /** Order by ascending */
    public static readonly ASC: SortMode = {
        resourceKey: 'Ascending',
        value: 'asc'
    };

    /** Order by descending */
    public static readonly DESC: SortMode = {
        resourceKey: 'Descending',
        value: 'desc'
    };

    /**
     * Returns a list containing all the sort options
     */
    public toList(): SortMode[] {
        const list: SortMode[] = [
            SortOptions.ASC, SortOptions.DESC
        ];
        return list;
    }
}