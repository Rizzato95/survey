import { Filter } from './Filter';
import { IQuery } from './IQuery';

/**
 * Rappresents the class used to make a query request with AutoQuery
 */
export class QueryRequest implements IQuery {
  /** The list of properties to retrive */
  properties?: string[];
  /** The filter used to build the query */
  filter: Filter;
  /** The number of record to skip (used for pagination) */
  skip?: number;
  /** The number of record to take (used for pagination) */
  take?: number;

  /**
   *
   * @param filter The filter of the query
   * @param properties The array of properties to retrieve
   * @param skip The items to skip
   * @param take The items to take
   */
  constructor(filter: Filter, properties?: string[], skip?: number, take?: number) {
    this.filter = filter;
    this.properties = properties ? properties : [];

    if (skip)
      this.skip = skip;

    if (take)
      this.take = take;
  }
}