// Mock data for stock prices
const mockPrices: Record<string, number> = {
  AAPL: 175.50,
  GOOGL: 2950.25,
  MSFT: 310.75,
  AMZN: 3350.50,
  TSLA: 875.25
};

export const getStockPrice = async (symbol: string): Promise<number> => {
  return mockPrices[symbol] || 0;
};

export const getStockDetails = async (symbol: string): Promise<{ name: string; price: number }> => {
  const mockNames: Record<string, string> = {
    AAPL: 'Apple Inc.',
    GOOGL: 'Alphabet Inc.',
    MSFT: 'Microsoft Corporation',
    AMZN: 'Amazon.com Inc.',
    TSLA: 'Tesla Inc.'
  };
  
  return {
    name: mockNames[symbol] || symbol,
    price: mockPrices[symbol] || 0
  };
};