import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { StockList } from './components/StockList';
import { StockForm } from './components/StockForm';
import { useStocks } from './hooks/useStocks';
import { getStockDetails } from './services/stockApi';
import type { Stock, PortfolioMetrics } from './types';

// Initial stocks
const mockStocks: Stock[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 1,
    buyPrice: 150.00,
    currentPrice: 175.50,
  },
  {
    id: '2',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 1,
    buyPrice: 2800.00,
    currentPrice: 2950.25,
  },
  {
    id: '3',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    quantity: 1,
    buyPrice: 280.00,
    currentPrice: 310.75,
  },
  {
    id: '4',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    quantity: 1,
    buyPrice: 3200.00,
    currentPrice: 3350.50,
  },
  {
    id: '5',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    quantity: 1,
    buyPrice: 900.00,
    currentPrice: 875.25,
  },
];

function App() {
  const { stocks, setStocks } = useStocks(mockStocks);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [showForm, setShowForm] = useState(false);

  const calculateMetrics = (): PortfolioMetrics => {
    const totalValue = stocks.reduce((sum, stock) => sum + stock.currentPrice * stock.quantity, 0);
    const totalCost = stocks.reduce((sum, stock) => sum + stock.buyPrice * stock.quantity, 0);
    const totalGainLoss = ((totalValue - totalCost) / totalCost) * 100;

    const stocksWithGains = stocks.map(stock => ({
      ...stock,
      gainLoss: ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100
    }));

    const topPerformer = [...stocksWithGains].sort((a, b) => b.gainLoss - a.gainLoss)[0];
    const worstPerformer = [...stocksWithGains].sort((a, b) => a.gainLoss - b.gainLoss)[0];

    return {
      totalValue,
      totalGainLoss,
      topPerformer,
      worstPerformer
    };
  };

  const handleAddStock = async (stockData: Partial<Stock>) => {
    try {
      const { name, price } = await getStockDetails(stockData.symbol!);
      const newStock: Stock = {
        id: Date.now().toString(),
        symbol: stockData.symbol!,
        name,
        quantity: stockData.quantity!,
        buyPrice: stockData.buyPrice!,
        currentPrice: price,
      };
      setStocks([...stocks, newStock]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding stock:', error);
      // Handle error (show notification, etc.)
    }
  };

  const handleEditStock = (stockData: Partial<Stock>) => {
    if (!selectedStock) return;
    
    const updatedStocks = stocks.map(stock =>
      stock.id === selectedStock.id
        ? { ...stock, ...stockData }
        : stock
    );
    setStocks(updatedStocks);
    setSelectedStock(null);
    setShowForm(false);
  };

  const handleDeleteStock = (id: string) => {
    setStocks(stocks.filter(stock => stock.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">Portfolio Tracker</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Stock
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard metrics={calculateMetrics()} />
        <StockList
          stocks={stocks}
          onEdit={(stock) => {
            setSelectedStock(stock);
            setShowForm(true);
          }}
          onDelete={handleDeleteStock}
        />
      </main>

      {showForm && (
        <StockForm
          stock={selectedStock || undefined}
          onSubmit={selectedStock ? handleEditStock : handleAddStock}
          onCancel={() => {
            setSelectedStock(null);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}

export default App;