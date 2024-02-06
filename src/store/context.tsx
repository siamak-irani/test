import { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";

type ContextType = {
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
};

const Store = createContext<ContextType>({
  counter: 0,
  setCounter: (newValue: number | ((prevState: number) => number)) => {},
});

type ContextProviderProps = {
  children: React.ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [counter, setCounter] = useState(0);

  return (
    <Store.Provider value={{ counter, setCounter }}>{children}</Store.Provider>
  );
};

export default Store;
