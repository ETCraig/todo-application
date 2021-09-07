import { useState, useEffect } from "react";

const useLocalOrSessionStorage = (key, session) => {
  const storage = session ? sessionStorage : localStorage;
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(atob(storage.getItem(key)));
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (!value) {
        storage.removeItem(key);
      } else {
        storage.setItem(key, btoa(JSON.stringify(value)));
      }
    } catch (e) {}
  });

  return [value, setValue];
};

const useLocalStorage = (key) => useLocalOrSessionStorage(key, false);
const useSessionStorage = (key) => useLocalOrSessionStorage(key, true);

export { useLocalStorage, useSessionStorage };
