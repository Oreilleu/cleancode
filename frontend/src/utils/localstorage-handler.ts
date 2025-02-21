import { LocalStorageKey } from "./enums/localstorage-key.enum";

export const setLocalStorage = <T>(key: LocalStorageKey, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = <T>(key: LocalStorageKey): T | null => {
  const item = localStorage.getItem(key);

  if (!item) {
    return null;
  }

  return JSON.parse(item);
};

export const removeLocalStorage = (key: LocalStorageKey): void => {
  localStorage.removeItem(key);
};
