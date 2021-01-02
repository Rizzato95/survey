/** Import models */
import { AutoQueryEntity } from '../models/AutoQueryEntity'
import { AutoQueryEntities } from '../models/AutoQueryEntities'
import { AutoQueryResponse } from '../models/AutoQueryResponse'
import { Filter } from '../models/Filter'
import { IQuery } from '../models/IQuery'
import { QueryRequest } from '../models/QueryRequest'

/** Import services */
import { AutoQueryService } from './AutoQueryService';

export class CrudBaseService extends AutoQueryService {

    /** The entity name */
    protected entityName!: string;

    /**
     * Initialize the service with the settings 'Msa.Core.MenuItemsServiceBaseUrl' or 'Msa.Core.CoreServicesBaseUrl'
     */
    constructor(entityName: string, baseUrl?: string) {
        super(baseUrl);
        this.entityName = entityName;
    }

    /**
     * Delete a element
     * @param item The element to create or update
     */
    public async delete(item: any): Promise<boolean> {
        if (item)
            return this.fetchDelete(`repository/${this.entityName}/${item.id}`);
        else
            return Promise.reject('No elements provided');
    }

    /**
     * Create or update a element
     * @param item The element to create or update
     */
    public update(item: any): Promise<any> {
        // Get data
        const data = Array.isArray(item) ? new AutoQueryEntities(item) : new AutoQueryEntity(item);
        // Execute query
        return this.fetchPut(`repository/${this.entityName}`, data);
    }

    /**
    * Create or update a element
    * @param item The element to create or update
    */
    public create(item: any): Promise<any> {
        // Get data
        const data = Array.isArray(item) ? new AutoQueryEntities(item) : new AutoQueryEntity(item);
        // Execute query
        return this.fetchPost(`repository/${this.entityName}`, data);
    }

    /**
     * Returns the element. If an id is passed an array with a single element is returned.
     * @param id The id of the item to get or null for all
     */
    public get(id?: number): Promise<any[]> {
        return this.fetchGet(`repository/${this.entityName}${id ? '/' + id : ''}`);
    }

    /**
     * Performs a query request to autoquery
     * @param query The query
     * @param append The append string (eg. aggregates functions)
     */
    public query<T>(query: IQuery, append?: string): Promise<AutoQueryResponse<T>> {
        return this.fetchQuery<any>(this.entityName, query, append);
    }

    /**
     * Performs a query request to autoquery
     * @param filter The filter for the query
     * @returns The array of results
     */
    public async queryFromFilter<T>(filter: Filter, skip?: number, take?: number): Promise<AutoQueryResponse<T>> {
        if (!filter)
            return Promise.reject('Missing filter');

        // Create Request
        const request: QueryRequest = new QueryRequest(filter, undefined, skip, take);
        // Execute request
        return await this.query(request);
    }
}
