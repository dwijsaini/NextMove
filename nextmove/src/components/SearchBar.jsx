import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, loading }) => {
  const [cityName, setCityName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextCityName = cityName.trim();

    if (nextCityName) {
      onSearch(nextCityName);
    }
  };

  return (
    <div className="search-bar">
      <p className="search-kicker">Plan smarter, move better</p>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          name="city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter a city name"
          className="search-input"
          disabled={loading}
          aria-label="City name"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? <span className="spinner spinner--button" aria-hidden="true" /> : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
