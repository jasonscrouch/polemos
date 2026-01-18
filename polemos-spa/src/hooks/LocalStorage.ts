import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

export default function useLocalStorage<T>(storageKey: string, fallbackState: T): [T, Dispatch<SetStateAction<T>>] {
  
  const [value, setValue] = useState<T>(() => {

    const item = localStorage.getItem(storageKey);

    return item ? JSON.parse(item)
        : fallbackState;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};
