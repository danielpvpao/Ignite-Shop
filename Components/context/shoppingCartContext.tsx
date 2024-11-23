import React, { createContext, useState, ReactNode } from 'react';

interface ShoppingCartContextType {
  itensNumber: number;
  setItensNumber: React.Dispatch<React.SetStateAction<number>>;
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export const ShoppingCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [itensNumber, setItensNumber] = useState<number>(0);

  return (
    <ShoppingCartContext.Provider value={{ setItensNumber, itensNumber }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
