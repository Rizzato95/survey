/** Import models */
import { Defaults } from '../models/Defaults';
import { TextValue } from '../models/TextValue';

/** Import helpers */
import { CacheHelper } from '../helpers/CacheHelper';

/** Import services */
import { BaseService } from './BaseService';
import { CommonHelper } from '@/helpers/CommonHelper';

/**
 * Service class for manage enums
 */
export class EnumService extends BaseService {
    /**
     * Initialize the base service
     */
    constructor() {
        super();
    }

    /**
     * Returns the menu items. If an id is passed an array with a single element is returned.
     * @param enumName The name of the enum
     */
    public async get(enumName: string): Promise<any> {
        let obj = this.getItem(enumName);
        if (!obj) {
            // Get enum
            obj = await this.fetchGet(`Tools/Enums${enumName ? '/' + enumName : ''}`);
            // Transform result in text-value array
            obj = obj ? this.mapEnum(obj.values) : null;
            // Translate items
            obj = obj ? await CommonHelper.translateObject(obj, 'text') : null;
            // Save items in cache
            this.setItem(enumName, obj);
        }

        return Promise.resolve<any>(obj);
    }

    /**
     * Given an enum retruns an array of text value with its values
     * @param en The enum
     */
    private mapEnum(en: any) {
        return Object.keys(en).map((key: any) => {
            key = isNaN(key) ? key : parseInt(key);
            return new TextValue(en[key], key);
        });
    }

    /**
     * Gets a menu item from the cache
     * @param name The menu item name
     */
    private getItem(name: string): any {
        return CacheHelper.getItem(`${Defaults.enumsLocalStorageName}-${name}`);
    }

    /**
     * Sets a menu item in the cache
     * @param enumName The enum name
     * @param enumObject The enum object
     */
    private setItem(enumName: string, enumObject: any) {
        CacheHelper.setItem(`${Defaults.enumsLocalStorageName}-${enumName}`, enumObject);
    }
}
