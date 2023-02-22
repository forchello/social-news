class LocalStorageService {
    save<T>(key: string, object: T): void {
        const json = JSON.stringify(object);
        localStorage.setItem(key, json);
    }

    get<T>(key: string): T | null {
        const json = localStorage.getItem(key);
        if (json) {
            return JSON.parse(json);
        }
        return null;
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }
}

export default new LocalStorageService();