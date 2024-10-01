import { useCallback, useState, Dispatch, SetStateAction } from 'react';

export type UpdateState<T> = Dispatch<SetStateAction<Partial<T>>>;

const useObjectState = <T>(initialStateData: T): [T, UpdateState<T>] => {
  const [stateData, setData] = useState<T>(initialStateData);

  const updateState = useCallback((newStateData: Partial<T> | ((data: T) => Partial<T>)) => {
    if (typeof newStateData === 'function') {
      setData((prevStateData) => {
        const initialDataFromFunction = newStateData as (data: T) => T;
        const updatedState = initialDataFromFunction(prevStateData);
        return {
          ...prevStateData,
          ...updatedState,
        };
      });
    } else {
      setData((prevStateData) => ({
        ...prevStateData,
        ...newStateData,
      }));
    }
  }, []);

  return [stateData, updateState];
};

export default useObjectState;
