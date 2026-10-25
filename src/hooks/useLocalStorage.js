import { useEffect, useState } from "react";

/**
 * Persist state in LocalStorage. Safe against JSON / storage errors.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable — keep in-memory state */
    }
  }, [key, value]);

  return [value, setValue];
}