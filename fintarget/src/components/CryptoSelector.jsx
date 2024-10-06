// src/components/CryptoSelector.jsx
import React, { useState } from 'react';

const CryptoSelector = ({ onSymbolChange, onIntervalChange }) => {
  const Crypto = [
    { value: "ETHUSDT", curr: "ETH/USDT" },
    { value: "BNBUSDT", curr: "BNB/USDT" },
    { value: "DOTUSDT", curr: "DOT/USDT" },
  ];

  const timeIntervals = [
    { value: "1m", label: "1 Minute" },
    { value: "3m", label: "3 Minutes" },
    { value: "5m", label: "5 Minutes" },
  ];

  const [selectedSymbol, setSelectedSymbol] = useState('ETHUSDT');
  const [selectedInterval, setSelectedInterval] = useState('1m');

  const handleSymbolChange = (newSymbol) => {
    setSelectedSymbol(newSymbol);
    onSymbolChange(newSymbol);
  };

  const handleIntervalChange = (newInterval) => {
    setSelectedInterval(newInterval);
    onIntervalChange(newInterval);
  };

  return (
    <div>
      <div className="dropdown mb-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="cryptoDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {Crypto.find(c => c.value === selectedSymbol)?.curr || 'Select Cryptocurrency'}
        </button>
        <ul className="dropdown-menu" aria-labelledby="cryptoDropdown">
          {Crypto.map((crypto) => (
            <li key={crypto.value}>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleSymbolChange(crypto.value)}
              >
                {crypto.curr}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="intervalDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {timeIntervals.find(i => i.value === selectedInterval)?.label || 'Select Time Interval'}
        </button>
        <ul className="dropdown-menu" aria-labelledby="intervalDropdown">
          {timeIntervals.map((interval) => (
            <li key={interval.value}>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleIntervalChange(interval.value)}
              >
                {interval.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CryptoSelector;
