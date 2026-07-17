import { useEffect, useState } from 'react';

/**
 * Devuelve el valor una vez que deja de cambiar durante `delayMs`.
 * Útil para búsquedas mientras el usuario escribe.
 */
export const useDebouncedValue = <T,>(value: T, delayMs = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timerId);
  }, [value, delayMs]);

  return debouncedValue;
};
