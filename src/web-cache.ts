import axios from 'axios';

interface Headers {
    [key: string]: string;
}

interface Busy {
    [key: string]: boolean;
}

interface CacheItem<T> {
    value: T | null;
    etag: string;
    timestamp: number;
}

class WebCache {
    private readonly timeout: number;
    private storage: Storage;
    private busy: Busy;
    constructor(storage: Storage) {
        this.timeout = 60 * 1000;
        this.storage = storage;
        this.busy = {};
    }
    public getValues<T>(pathes: string[], onChange: () => void) : (T | null)[] {
        Promise.all(pathes.map(path => this.loadAsync<T>(path))).then(changed => {
            if (changed.some(c => c)) {
                onChange();
            }
        });
        return pathes.map(path => this.getItem<T>(path).value);
    }
    public getValue<T>(path: string, onChange: () => void) : T | null {
        this.loadAsync<T>(path).then(changed => {
            if (changed) {
                onChange();
            }
        });
        return this.getItem<T>(path).value;
    }
    private async loadAsync<T>(path: string) : Promise<boolean> {
        if (this.busy[path]) {
            return false;
        }
        this.busy[path] = true;
        let changed = false;
        let item = this.getItem<T>(path);
        if (!item.etag || Date.now() >= item.timestamp + this.timeout) {
            let response = await axios.get(path, {
                baseURL: process.env.VUE_APP_DATA_DIRECTORY,
                headers: this.getHeaders(item.etag),
                validateStatus: () => true
            });
            if (response.status == 200) {
                changed = JSON.stringify(response.data) != JSON.stringify(item.value);
                item.value = response.data;
                item.etag = response.headers.etag || '';
            }
            item.timestamp = Date.now();
            this.setItem<T>(path, item);
        }
        this.busy[path] = false;
        return changed;
    }
    private getItem<T>(key: string) : CacheItem<T> {
        let item = this.storage.getItem('wp_cache_' + key);
        return item ? JSON.parse(item) : {
            value: null,
            etag: '',
            timestamp: 0
        };
    }
    private setItem<T>(key: string, item: CacheItem<T>) : void {
        this.storage.setItem('wp_cache_' + key, JSON.stringify(item));
    }
    private getHeaders(etag: string) : Headers {
        return etag ? { 'If-None-Match': etag } : {};
    }
}

const sessionCache = new WebCache(sessionStorage);
const localCache = new WebCache(localStorage);

export { sessionCache, localCache }; 