import { useState, useEffect } from "react";

export default function useLocalStorage<T>(storageKey: string, fallbackState: T) {
  
  const [value, setValue] = useState(() => {

    const item = localStorage.getItem(storageKey);

    return item ? JSON.parse(item)
        : fallbackState;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};
