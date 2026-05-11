import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = {
  code: string;
  symbol: string;
  label: string;
};

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', label: 'USD' },
  { code: 'INR', symbol: '₹', label: 'INR' },
  { code: 'EUR', symbol: '€', label: 'EUR' },
  { code: 'GBP', symbol: '£', label: 'GBP' },
];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (code: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(currencies[0]);

  useEffect(() => {
    const saved = localStorage.getItem('app-currency');
    if (saved) {
      const found = currencies.find(c => c.code === saved);
      if (found) setCurrencyState(found);
    }
  }, []);

  const setCurrency = (code: string) => {
    const found = currencies.find(c => c.code === code);
    if (found) {
      setCurrencyState(found);
      localStorage.setItem('app-currency', code);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
