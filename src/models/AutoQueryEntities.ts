/** The class to use as body for autoquery creations and updates */
export class AutoQueryEntities<T> {
    /** The items */
    public items: T[];
    /**
     * Assign the given items to the property
     * @param items The items to assign
     */
    constructor(items: T[]) {
        this.items = items;
    }
}