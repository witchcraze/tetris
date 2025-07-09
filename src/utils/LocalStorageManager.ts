export class LocalStorageManager {
  static saveItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  }

  static loadItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error("Error loading from localStorage", e);
      return null;
    }
  }

  static clearItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Error clearing from localStorage", e);
    }
  }
}