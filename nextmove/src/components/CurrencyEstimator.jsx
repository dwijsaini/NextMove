import { useState, useEffect } from 'react';
import './CurrencyEstimator.css';

// Country code to Currency mapping details
const countryCurrencies = {
  US: { code: 'USD', name: 'US Dollar', symbol: '$' },
  GB: { code: 'GBP', name: 'British Pound', symbol: '£' },
  JP: { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  IN: { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  CN: { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  AU: { code: 'AUD', name: 'Australian Dollar', symbol: '$' },
  CA: { code: 'CAD', name: 'Canadian Dollar', symbol: '$' },
  CH: { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  SG: { code: 'SGD', name: 'Singapore Dollar', symbol: '$' },
  NZ: { code: 'NZD', name: 'New Zealand Dollar', symbol: '$' },
  HK: { code: 'HKD', name: 'Hong Kong Dollar', symbol: '$' },
  KR: { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  ZA: { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  MX: { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  BR: { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  RU: { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  TR: { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  SA: { code: 'SAR', name: 'Saudi Riyal', symbol: 'SR' },
  TH: { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  MY: { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  ID: { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  PH: { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  AE: { code: 'AED', name: 'UAE Dirham', symbol: 'AED' },
  EG: { code: 'EGP', name: 'Egyptian Pound', symbol: 'EGP' },
  VN: { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  // Eurozone default
  FR: { code: 'EUR', name: 'Euro', symbol: '€' },
  DE: { code: 'EUR', name: 'Euro', symbol: '€' },
  IT: { code: 'EUR', name: 'Euro', symbol: '€' },
  ES: { code: 'EUR', name: 'Euro', symbol: '€' },
  NL: { code: 'EUR', name: 'Euro', symbol: '€' },
  BE: { code: 'EUR', name: 'Euro', symbol: '€' },
  AT: { code: 'EUR', name: 'Euro', symbol: '€' },
  IE: { code: 'EUR', name: 'Euro', symbol: '€' },
  PT: { code: 'EUR', name: 'Euro', symbol: '€' },
  GR: { code: 'EUR', name: 'Euro', symbol: '€' },
  FI: { code: 'EUR', name: 'Euro', symbol: '€' },
  SK: { code: 'EUR', name: 'Euro', symbol: '€' },
  SI: { code: 'EUR', name: 'Euro', symbol: '€' },
  CY: { code: 'EUR', name: 'Euro', symbol: '€' },
  MT: { code: 'EUR', name: 'Euro', symbol: '€' },
  EE: { code: 'EUR', name: 'Euro', symbol: '€' },
  LV: { code: 'EUR', name: 'Euro', symbol: '€' },
  LT: { code: 'EUR', name: 'Euro', symbol: '€' },
  HR: { code: 'EUR', name: 'Euro', symbol: '€' },
};

const defaultCurrency = { code: 'USD', name: 'US Dollar', symbol: '$' };

// Cost estimates base in USD
const costBases = {
  backpacker: 60, // $60 USD / day
  midrange: 160,   // $160 USD / day
  luxury: 450,    // $450 USD / day
};

const CurrencyEstimator = ({ countryCode }) => {
  const [rates, setRates] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState('USD'); // User's currency
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const localCurrency = countryCurrencies[countryCode] || defaultCurrency;

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error('Failed to fetch exchange rates');
        const data = await response.json();
        setRates(data.rates);
      } catch (err) {
        setError('Exchange rate data unavailable.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  if (!countryCode) return null;

  const rateUSDToLocal = rates ? rates[localCurrency.code] : null;
  const rateUSDToBase = rates ? rates[baseCurrency] : 1;

  // Format values
  const formatCost = (usdValue) => {
    if (!rateUSDToLocal) return '...';
    const localVal = usdValue * rateUSDToLocal;
    return `${localCurrency.symbol}${Math.round(localVal).toLocaleString()}`;
  };

  const formatCostInBase = (usdValue) => {
    const baseVal = usdValue * rateUSDToBase;
    const baseSymbol = baseCurrency === 'USD' ? '$' : baseCurrency === 'EUR' ? '€' : '£';
    return `${baseSymbol}${Math.round(baseVal)}`;
  };

  return (
    <article className="card currency-card">
      <div className="card-header">
        <div>
          <p className="card-label">Financial Guide</p>
          <h3>Currency & Daily Budget</h3>
        </div>
      </div>

      <div className="currency-info-box">
        <div className="info-row">
          <span className="info-label">Local Currency</span>
          <strong className="info-value">
            {localCurrency.name} ({localCurrency.code} - {localCurrency.symbol})
          </strong>
        </div>

        {rateUSDToLocal && (
          <div className="info-row exchange-rate-row">
            <span className="info-label">Exchange Rate</span>
            <div className="rate-value-group">
              <span className="rate-item">1 USD = {rateUSDToLocal.toFixed(2)} {localCurrency.code}</span>
              {localCurrency.code !== 'EUR' && rates?.EUR && (
                <span className="rate-item">1 EUR = {(rateUSDToLocal / rates.EUR).toFixed(2)} {localCurrency.code}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="currency-error">{error}</p>}
      {loading && <p className="currency-loading">Loading exchange data...</p>}

      {!loading && !error && rateUSDToLocal && (
        <div className="budget-section">
          <div className="budget-section-header">
            <h4>Estimated Daily Costs</h4>
            <div className="currency-toggle">
              <button 
                className={`toggle-btn ${baseCurrency === 'USD' ? 'active' : ''}`}
                onClick={() => setBaseCurrency('USD')}
              >
                USD
              </button>
              <button 
                className={`toggle-btn ${baseCurrency === 'EUR' ? 'active' : ''}`}
                onClick={() => setBaseCurrency('EUR')}
              >
                EUR
              </button>
              {localCurrency.code !== 'USD' && localCurrency.code !== 'EUR' && (
                <button 
                  className={`toggle-btn ${baseCurrency === localCurrency.code ? 'active' : ''}`}
                  onClick={() => setBaseCurrency(localCurrency.code)}
                >
                  {localCurrency.code}
                </button>
              )}
            </div>
          </div>

          <div className="budget-list">
            {/* Backpacker */}
            <div className="budget-item">
              <div className="budget-item-info">
                <span className="budget-tier">Backpacker</span>
                <span className="budget-price">
                  <strong>{formatCost(costBases.backpacker)}</strong>
                  {baseCurrency !== localCurrency.code && (
                    <span className="converted-price"> ({formatCostInBase(costBases.backpacker)})</span>
                  )}
                </span>
              </div>
              <div className="budget-progress-bar">
                <div className="progress-fill backpacker-fill" style={{ width: '25%' }}></div>
              </div>
              <span className="budget-desc">Hostels, local food, public transit.</span>
            </div>

            {/* Midrange */}
            <div className="budget-item">
              <div className="budget-item-info">
                <span className="budget-tier">Mid-range traveler</span>
                <span className="budget-price">
                  <strong>{formatCost(costBases.midrange)}</strong>
                  {baseCurrency !== localCurrency.code && (
                    <span className="converted-price"> ({formatCostInBase(costBases.midrange)})</span>
                  )}
                </span>
              </div>
              <div className="budget-progress-bar">
                <div className="progress-fill midrange-fill" style={{ width: '55%' }}></div>
              </div>
              <span className="budget-desc">3-star hotel, dining out, casual sights.</span>
            </div>

            {/* Luxury */}
            <div className="budget-item">
              <div className="budget-item-info">
                <span className="budget-tier">Luxury holiday</span>
                <span className="budget-price">
                  <strong>{formatCost(costBases.luxury)}</strong>
                  {baseCurrency !== localCurrency.code && (
                    <span className="converted-price"> ({formatCostInBase(costBases.luxury)})</span>
                  )}
                </span>
              </div>
              <div className="budget-progress-bar">
                <div className="progress-fill luxury-fill" style={{ width: '90%' }}></div>
              </div>
              <span className="budget-desc">5-star hotel, fine dining, private tours.</span>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default CurrencyEstimator;
