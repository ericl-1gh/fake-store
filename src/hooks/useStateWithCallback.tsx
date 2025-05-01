import React, {useState, useRef} from 'react';

type SetStateCallback<T> = (value: T, callback?: () => void) => void;

function useStateWithCallback<T>(initialValue: T): [T, SetStateCallback<T>] {
  const [state, setState] = useState<T>(initialValue);
  const callbackRef = useRef<(() => void) | null>(null);

  const setStateWithCallback: SetStateCallback<T> = (value, callback) => {
    callbackRef.current = callback || null;
    setState(value);
  };

  // Use `useEffect` to run the callback after the state is updated
  React.useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current();
      callbackRef.current = null; // Clear the callback after it's executed
    }
  }, [state]);

  return [state, setStateWithCallback];
}

export {useStateWithCallback};
