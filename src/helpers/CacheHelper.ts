/**
 * A utility for caching elements in the localStorage
 */
export class CacheHelper {

    /** The singleton method to get the instance */
    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    /**
     * Sets an item in the cache. Internally uses JSON.stringify(value) to save the string in the cache.
     * If a value with the same key exsists, it will be overwritten.
     * @param key The item key
     * @param value The value
     */
    public static setItem<T>(key: string, value: T) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (ex) {
            console.warn(`[CacheHelper:setItem()] error saving the item with key '${key}' in the localStorage`, ex);
        }
    }

    /**
     * Return the item saved in the cache or null.
     * @param key The item key
     */
    public static getItem<T>(key: string): T | null {
        try {
            const str = localStorage.getItem(key);
            if (str)
                return JSON.parse(str);
            return null;
        } catch (ex) {
            console.warn(`[CacheHelper:getItem()] error reading the item with key '${key}' in the localStorage`, ex);
            return null;
        }
    }

    /**
     * Removes an item from the cache
     * @param key The item key
     */
    public static removeItem(key: string) {
        localStorage.removeItem(key);
    }

    /**
     * Clear all the cache items
     */
    public static clearAll() {
        localStorage.clear();
    }

    /** The singleton instance */
    private static instance: CacheHelper;
}
