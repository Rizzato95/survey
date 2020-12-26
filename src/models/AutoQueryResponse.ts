/** Rappresents a generic AutoQuery response */
export class AutoQueryResponse<T> {
    /** The items offset */
    public offset!: number;
    /** The total items count */
    public total!: number;
    /** The items */
    public results!: T[];
}