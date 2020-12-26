import { Filter } from './Filter';

/** Rappresents the interface used to make a query request with AutoQuery */
export interface IQuery {
    /** The list of properties to retrive */
    properties?: string[];
    /** The filter used to build the query */
    filter: Filter;
    /** The number of record to skip (used for pagination) */
    skip?: number;
    /** The number of record to take (used for pagination) */
    take?: number;
}