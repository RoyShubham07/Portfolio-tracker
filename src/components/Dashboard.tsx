import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import type { PortfolioMetrics } from '../types';

interface DashboardProps {
  metrics: PortfolioMetrics;
}

export function Dashboard({ metrics }: DashboardProps) {
  const isPositiveGain = metrics.totalGainLoss >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Portfolio Value</p>
            <p className="text-2xl font-bold">${metrics.totalValue.toFixed(2)}</p>
          </div>
          <DollarSign className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Gain/Loss</p>
            <p className={`text-2xl font-bold ${isPositiveGain ? 'text-green-500' : 'text-red-500'}`}>
              {isPositiveGain ? '+' : ''}{metrics.totalGainLoss.toFixed(2)}%
            </p>
          </div>
          {isPositiveGain ? (
            <TrendingUp className="h-8 w-8 text-green-500" />
          ) : (
            <TrendingDown className="h-8 w-8 text-red-500" />
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Top Performer</p>
            {metrics.topPerformer ? (
              <>
                <p className="text-lg font-bold">{metrics.topPerformer.symbol}</p>
                <p className="text-sm text-green-500">
                  ${metrics.topPerformer.currentPrice.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-lg">-</p>
            )}
          </div>
          <TrendingUp className="h-8 w-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Portfolio Distribution</p>
            <p className="text-lg font-bold">5 Stocks</p>
          </div>
          <PieChart className="h-8 w-8 text-purple-500" />
        </div>
      </div>
    </div>
  );
}