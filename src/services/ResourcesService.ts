/** Import models */

import { Defaults } from '../models/Defaults';
import { ResourceUI } from '../models/ResourceUI';

/** Import helpers */
import { CacheHelper } from '../helpers/CacheHelper';

/** Import services */
import { AutoQueryService } from './AutoQueryService';

export class ResourcesService extends AutoQueryService {
    /** The resource default context */
    private resourcesDefaultContext: string;

    /**
     * Initialize the service with the settings 'Msa.Core.GlobalizationServiceBaseUrl' or 'Msa.Core.CoreServicesBaseUrl'
     */
    constructor() {
        super();

        // Set resources default context
        this.resourcesDefaultContext = Defaults.resourcesDefaultContext ?? 'Dictionary';
    }

    /**
     * Returns an array of DictionryItem
     */
    public getDictionary() {
        return this.getCachedDictionary();
    }

    /**
     * Get a resource from the service if not already saved
     * @param key The resource key
     * @param context The resource context
     */
    public async getResource(key: string, context?: string): Promise<ResourceUI> {
        if (!key)
            return Promise.reject();

        // Set upper case to the key
        key = key.length > 0 ? (key.charAt(0).toUpperCase() + key.slice(1)) : '';

        // If context doesn't exists, set default value
        if (!context)
            context = this.resourcesDefaultContext;

        // Check if resource already exists in cache
        let resource: ResourceUI | undefined = this.getCacheItem(key, context);

        if (!resource) { // Otherwhise perform a get request
            resource = await this.fetchGet<ResourceUI>('resources/' + key + ((context) ? ('/' + context) : ''), false);

            // If the resource exists, add it in the cache
            if (resource && (resource.stringValue || resource.binaryValue))
                this.updateCacheItem(resource);
        }

        // If resource isn't found
        if (!resource)
            resource = new ResourceUI(key, '[' + key + ']');

        return Promise.resolve(resource);
    }

    /**
     * Creates or updates a cached item
     * @param resource The resource to create or update
     */
    private updateCacheItem(resource: ResourceUI): any {
        if (resource) {
            // Get dictionary from cache
            let resources = this.getCachedDictionary();

            resources = resources.filter((r: any) => r.id !== resource.id);

            // then push it
            resources.push(resource);

            // Save dictionary in cache
            CacheHelper.setItem(Defaults.dictionaryLocalStorageName, resources);
        }
    }

    /**
     * Return a cached item if exist, undefined otherwise
     * @param key The resource key
     * @param context The resource context
     */
    private getCacheItem(key: string, context: string): ResourceUI | undefined {
        // Get dictionary from cache
        const resources = this.getCachedDictionary();
        // Search item in local cache dictionary
        const cachedItem = resources.find((r: any) => r.resourceKey === key && r.resourceContext === context);
        if (cachedItem)
            return cachedItem;
        else
            return undefined;
    }

    /**
     * Removes the dictionary with the given language from the cache
     */
    public emptyDictionary() {
        CacheHelper.setItem(Defaults.dictionaryLocalStorageName, []);
    }

    /**
     * Returns the dictionary in the localStorage with the current language or empty array
     */
    private getCachedDictionary(): ResourceUI[] {
        const dic: ResourceUI[] | null = CacheHelper.getItem(Defaults.dictionaryLocalStorageName);
        return dic && Array.isArray(dic) ? dic : [];
    }
}