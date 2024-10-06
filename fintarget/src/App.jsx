import React, { useState, useEffect } from 'react';
import CryptoSelector from './components/CryptoSelector';
import MarketChart from './components/MarketChart';
import { connectWebSocket, disconnectWebSocket } from './websocket';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  const [symbol, setSymbol] = useState('ETHUSDT');
  const [interval, setInterval] = useState('1m');
  const [chartData, setChartData] = useState({
    labels: [], // Timestamps
    datasets: [
      {
        label: 'Price',
        data: [], // Prices
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  });

  const handleSymbolChange = (newSymbol) => {
    setSymbol(newSymbol);
  };

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
  };

  useEffect(() => {
    const handleNewData = ({ time, price }) => {
      setChartData((prevData) => {
        const newLabels = [...prevData.labels, time];
        const newPrices = [...prevData.datasets[0].data, price];

        if (newLabels.length > 50) {
          newLabels.shift();
          newPrices.shift();
        }

        return {
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newPrices,
            },
          ],
        };
      });
    };

    // Connect to the WebSocket when the component mounts
    connectWebSocket(symbol, interval, handleNewData);

    // Disconnect from the WebSocket when the component unmounts
    return () => {
      disconnectWebSocket();
    };
  }, [symbol, interval]);

  return (
    <div className='container'>
      <h1 className='container'>Crypto Market Chart</h1>
      <CryptoSelector onSymbolChange={handleSymbolChange} onIntervalChange={handleIntervalChange} />
      <MarketChart chartData={chartData} />
    </div>
  );
};

export default App;
