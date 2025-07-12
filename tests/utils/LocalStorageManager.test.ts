import { LocalStorageManager } from '../../src/utils/LocalStorageManager';

describe('LocalStorageManager', () => {
  const MOCK_KEY = 'testKey';
  const MOCK_VALUE = 'testValue';

  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = (() => {
      let store: { [key: string]: string } = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value.toString(); },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { store = {}; }
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    // Clear localStorage before each test
    localStorage.clear();
    // Restore original localStorage methods after each test
    jest.restoreAllMocks();
  });

  it('should save an item to localStorage', () => {
    LocalStorageManager.saveItem(MOCK_KEY, MOCK_VALUE);
    expect(localStorage.getItem(MOCK_KEY)).toBe(MOCK_VALUE);
  });

  it('should load an item from localStorage', () => {
    localStorage.setItem(MOCK_KEY, MOCK_VALUE);
    expect(LocalStorageManager.loadItem(MOCK_KEY)).toBe(MOCK_VALUE);
  });

  it('should return null if item does not exist', () => {
    expect(LocalStorageManager.loadItem('nonExistentKey')).toBeNull();
  });

  it('should clear an item from localStorage', () => {
    localStorage.setItem(MOCK_KEY, MOCK_VALUE);
    LocalStorageManager.clearItem(MOCK_KEY);
    expect(localStorage.getItem(MOCK_KEY)).toBeNull();
  });

  it('should log error when saving fails', () => {
    const setItemSpy = jest.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    LocalStorageManager.saveItem(MOCK_KEY, MOCK_VALUE);

    expect(setItemSpy).toHaveBeenCalledWith(MOCK_KEY, MOCK_VALUE);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error saving to localStorage", expect.any(Error));

    setItemSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should log error and return null when loading fails', () => {
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = LocalStorageManager.loadItem(MOCK_KEY);

    expect(getItemSpy).toHaveBeenCalledWith(MOCK_KEY);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error loading from localStorage", expect.any(Error));
    expect(result).toBeNull();

    getItemSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should log error when clearing fails', () => {
    const removeItemSpy = jest.spyOn(localStorage, 'removeItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    LocalStorageManager.clearItem(MOCK_KEY);

    expect(removeItemSpy).toHaveBeenCalledWith(MOCK_KEY);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error clearing from localStorage", expect.any(Error));

    removeItemSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});