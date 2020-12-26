/** The class to use as body for autoquery creations and updates */
export class AutoQueryEntity<T> {
    /** The item */
    public item: T;
    /**
     * Assign the given item to the property
     * @param item The item to assign
     */
    constructor(item: T) {
        this.item = item;
    }
}