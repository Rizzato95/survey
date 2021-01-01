/** Import services */
import { ResourcesService } from '../services/ResourcesService';

export class CommonHelper {
    /**
     * Given an array of items with a 'resourceKey' property, translate each item and sort them by alphabetical order.
     * @param object the array to translate
     * @param translateField The property of the array to translate
     * @param contextField The resource context field
     * @param context The resource context (if the contextField property is not set)
     * @param sortByTranslation  Indicates if the array will be return sort by translate field
     */
    public static async translateObject(object: object[], translateField?: string, contextField?: string, context?: string, sortByTranslation = false): Promise<any[]> {
        if (object) {
            // Initialize the resource service
            const resourceService: ResourcesService = new ResourcesService();
            if (!resourceService)
                return [];
            else {
                // Loop throught every single element of the object
                let results = await Promise.all(object.map(async (el: any) => {
                    // Set the properties for the translation
                    const resourceKey = translateField ? el[translateField] : el.resourceKey;
                    const resourceContext = contextField && el[contextField] ? el[contextField] : context;

                    // Get the translation
                    const result = await resourceService.getResource(resourceKey, resourceContext);

                    // Set the value into the right property
                    el.translation = result.stringValue;
                    return el;
                }));

                if (sortByTranslation)
                    results = this.sortObject(results, 'translation');

                return results;
            }
        } else
            return Promise.resolve([]);
    }

    /**
     * Sort a complex object by specificated property
     * @param object The object to be ordered
     * @param property The property of the object to be sorted on
     * @param ascending If the sorting is to be ascending or descending
     */
    public static sortObject(object: any[], property?: string, ascending = true): any[] {
        return object.sort((a: any, b: any) => {

            let firstProperty = property ? a[property] : a;
            let secondProperty = property ? b[property] : b;

            firstProperty = firstProperty ? firstProperty : '';
            secondProperty = secondProperty ? secondProperty : '';

            /** Check if a property exists */
            if (isNaN(firstProperty)) /** It's a string */
                return ((firstProperty.localeCompare(secondProperty)) * (ascending ? (1) : (-1)));
            else /** It's a number */
                return ((parseFloat(firstProperty) - parseFloat(secondProperty)) * (ascending ? (1) : (-1)));
        });
    }
}