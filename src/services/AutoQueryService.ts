/** Import models */
import { AutoQueryResponse } from '../models/AutoQueryResponse'
import { Condition } from '../models/Condition'
import { IQuery } from '../models/IQuery'
import { OperatorType } from '../models/enums/OperatorType'
import { Sort } from '../models/Sort'
import { SortOptions } from '../models/SortOptions'

/** Import base class */
import { BaseService } from './BaseService';

/** Rappresents an AutoQuery service proxy */
export class AutoQueryService extends BaseService {
  /** The ServiceStackAutoquery operators mapping */
  private operatorsMapping: Map<string, string> = new Map();

  /**
   * This instance baseUrl
   * @param baseUrl The baseUrl
   */
  constructor(baseUrl?: string) {
    super(baseUrl);

    /** Map the operators according to http://docs.servicestack.net/autoquery-rdbms */
    this.operatorsMapping.set(OperatorType.Equals, '=');
    this.operatorsMapping.set(OperatorType.GreaterThan, 'GreaterThan=');
    this.operatorsMapping.set(OperatorType.LessThan, 'LessThan=');
    this.operatorsMapping.set(OperatorType.GreaterEqualThan, 'GreaterThanOrEqualTo=');
    this.operatorsMapping.set(OperatorType.LessEqualThan, 'LessThanOrEqualTo=');
    this.operatorsMapping.set(OperatorType.NotEqual, 'NotEqualTo=');
    this.operatorsMapping.set(OperatorType.Contains, 'Contains=');
    this.operatorsMapping.set(OperatorType.StartsWith, 'StartsWith=');
    this.operatorsMapping.set(OperatorType.EndsWith, 'EndsWith=');
    this.operatorsMapping.set(OperatorType.In, 'In=');
  }

  /**
   * Given a IQuery entity returns the AutoQuery compliant querystring
   * @param entity The entity to translate
   * @param append The optional append options (eg. aggregates functions, ecc)
   */
  protected translate(entity: IQuery | null, append?: string): string {
    let myQuery = '';
    if (entity) {
      // Get the selected properties
      if (entity.properties && entity.properties.length > 0) {
        myQuery += '?Fields=id,rowVersion,';
        entity.properties.forEach((property: string, index: number) => {
          if (property !== 'id' && property !== 'rowVersion') {
            myQuery += property;
            if (entity.properties)
              myQuery += (index <= entity.properties.length - 1) ? ',' : '';
          }
        });
      }
      // Append skip
      if (entity.skip && entity.skip >= 0) {
        myQuery += this.setConjunction(myQuery);
        myQuery += 'Skip=' + entity.skip;
      }

      // Append take
      myQuery += this.setConjunction(myQuery);
      if (!entity.take || entity.take <= 0)
        entity.take = 50;
      myQuery += 'Take=' + (entity.take >= 0 ? entity.take : 50);

      // Append filter condition
      if (entity.filter && entity.filter.conditions && entity.filter.conditions.length > 0)
        entity.filter.conditions.forEach((c: Condition) => {
          myQuery += this.setConjunction(myQuery);
          myQuery += c.field + this.mapServiceStackOperator(c.operator) + c.value;
        });

      // Append filter group by
      if (entity.filter && entity.filter.groupBySettings && entity.filter.groupBySettings.length > 0) {
        myQuery += this.setConjunction(myQuery);
        // Multiple order by (eg. &orderBy=Context,-ResourceKey)
        myQuery += 'groupBy=';
        entity.filter.groupBySettings.forEach((s: string, index: number) => {
          // append a '-' if the sort mode is DESC
          myQuery += s;
          // append also a comma ',' if the item is not the last
          myQuery += index !== entity.filter.groupBySettings.length - 1 ? ',' : '';
        });
      }

      // Append filter sort
      if (entity.filter && entity.filter.sortingSettings && entity.filter.sortingSettings.length > 0) {
        myQuery += this.setConjunction(myQuery);
        // Multiple order by (eg. &orderBy=Context,-ResourceKey)
        myQuery += 'orderBy=';
        entity.filter.sortingSettings.forEach((s: Sort, index: number) => {
          // append a '-' if the sort mode is DESC
          myQuery += (s.mode.value === SortOptions.DESC.value ? '-' : '') + s.field;
          // append also a comma ',' if the item is not the last
          myQuery += index !== entity.filter.sortingSettings.length - 1 ? ',' : '';
        });
      }
    }

    // append at the end of query
    if (append)
      myQuery += append;

    // append the count(*)
    myQuery += this.setConjunction(myQuery) + 'include=COUNT(*)';

    return myQuery;
  }

  /**
   * Performs a request to autoquery in AND mode.
   * If the query filter condition in position 1 (the parent condition - assuming it exists) contains the value 'OR' the query is forwared to autoquery in OR mode.
   * @param url The url (the baseUrl is already included in the instance => BASE_URL/query/${your url}/${your query})
   * @param query The query
   * @param append The append string (eg. aggregates functions)
   */
  protected fetchQuery<T>(url: string, query: IQuery | null, append?: string): Promise<AutoQueryResponse<T>> {
    const isQueryOr = query && query.filter && query.filter.conditions && query.filter.conditions.length > 1 ? query.filter.conditions[1].relationType === 'OR' : false;

    if (isQueryOr && query)
      return this.fetchQueryOr(url, query, append);

    return this.fetchGet<AutoQueryResponse<T>>(`query/${url}${this.translate(query, append)}`);
  }

  /**
   * Performs a request to autoquery in OR.
   * @param url The url (the baseUrl is already included in the instance => BASE_URL/queryor/${your url}/${your query})
   * @param query The query
   * @param append The append string (eg. aggregates functions)
   */
  protected fetchQueryOr<T>(url: string, query: IQuery | null, append?: string): Promise<AutoQueryResponse<T>> {
    return this.fetchGet<AutoQueryResponse<T>>(`queryor/${url}${this.translate(query, append)}`);
  }

  /**
   * Performs a request to autoquery in tree.
   * @param url The url (the baseUrl is already included in the instance => BASE_URL/queryor/${your url}/${your query})
   * @param query The query
   * @param append The append string (eg. aggregates functions)
   */
  protected fetchQueryTree<T>(url: string, query: IQuery | null, append?: string): Promise<AutoQueryResponse<T>> {
    return this.fetchGet<AutoQueryResponse<T>>(`querytree/${url}${this.translate(query, append)}`);
  }

  /**
   * Set the correct conjunction
   */
  private setConjunction(query: string) {
    return (query === '') ? '?' : '&';
  }

  /**
   * Given a string operator, such as '>=' or '<=' returns the corrisponding ServiceStackAutoquery compliant operator
   * @param operator The operator to map in autoquery
   */
  public mapServiceStackOperator(operator: string): string {
    return this.operatorsMapping.get(operator) || operator;
  }
}
