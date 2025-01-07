import { useState, useEffect } from 'react';
import { getStockPrice } from '../services/stockApi';
import type { Stock } from '../types';

export function useStocks(initialStocks: Stock[]) {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);

  useEffect(() => {
    const updatePrices = async () => {
      const updatedStocks = await Promise.all(
        stocks.map(async (stock) => {
          try {
            const currentPrice = await getStockPrice(stock.symbol);
            return { ...stock, currentPrice };
          } catch (error) {
            // Safe error logging without Symbol
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error(`Error updating price for ${stock.symbol}: ${errorMessage}`);
            return stock;
          }
        })
      );
      setStocks(updatedStocks);
    };

    const interval = setInterval(updatePrices, 60000); // Update every minute
    updatePrices(); // Initial update

    return () => clearInterval(interval);
  }, []);

  return { stocks, setStocks };
}