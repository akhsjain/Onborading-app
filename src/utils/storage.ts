/**
 * localStorage utility functions with error handling
 */

/**
 * Safely get item from localStorage
 */
export function getStorageItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key)
    if (item === null) {
      return null
    }
    return JSON.parse(item) as T
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error)
    return null
  }
}

/**
 * Safely set item to localStorage
 */
export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error)
  }
}

/**
 * Safely remove item from localStorage
 */
export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
  }
}
