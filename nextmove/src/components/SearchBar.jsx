import { useState, useEffect, useRef } from 'react';
import { fetchCitySuggestions } from '../services/api';
import './SearchBar.css';

const SearchBar = ({ onSearch, loading, recents, favorites }) => {
  const [cityName, setCityName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions with debounce
  useEffect(() => {
    const trimmed = cityName.trim();
    if (trimmed.length < 2) return;

    const delayDebounce = setTimeout(async () => {
      try {
        const results = await fetchCitySuggestions(trimmed);
        setSuggestions(results);
      } catch (err) {
        console.error('Failed to load city suggestions:', err);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [cityName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextCityName = cityName.trim();
    if (nextCityName) {
      onSearch(nextCityName);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setShowSuggestions(true);
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setShowSuggestions(true);
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        selectSuggestion(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  const selectSuggestion = (s) => {
    const displayName = s.state ? `${s.name}, ${s.state}, ${s.country}` : `${s.name}, ${s.country}`;
    setCityName(displayName);
    setSuggestions([]);
    setActiveIndex(-1);
    setShowSuggestions(false);
    onSearch(displayName);
  };

  return (
    <div className="search-bar-wrapper" ref={dropdownRef}>
      <p className="search-kicker">Plan smarter, move better</p>
      
      <form onSubmit={handleSubmit} className="search-form" role="search">
        <div className="input-container">
          <input
            type="text"
            name="city"
            value={cityName}
            onChange={(e) => {
              const val = e.target.value;
              setCityName(val);
              if (val.trim().length < 2) {
                setSuggestions([]);
              }
              setShowSuggestions(true);
              setActiveIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Enter a city name"
            className="search-input"
            disabled={loading}
            aria-label="City name"
            aria-autocomplete="list"
            aria-controls="autocomplete-dropdown"
            aria-expanded={showSuggestions && suggestions.length > 0}
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <ul
              id="autocomplete-dropdown"
              className="suggestions-list"
              role="listbox"
              aria-label="City suggestions"
            >
              {suggestions.map((item, index) => {
                return (
                  <li
                    key={index}
                    role="option"
                    aria-selected={index === activeIndex}
                    className={`suggestion-item ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => selectSuggestion(item)}
                  >
                    <span className="city-name-text">{item.name}</span>
                    <span className="city-region-text">
                      {item.state ? `${item.state}, ` : ''}{item.country}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        
        <button type="submit" className="search-button" disabled={loading} aria-label="Submit Search">
          {loading ? <span className="spinner spinner--button" aria-hidden="true" /> : 'Search'}
        </button>
      </form>

      {/* Quick search chips */}
      {((recents && recents.length > 0) || (favorites && favorites.length > 0)) && (
        <div className="quick-chips-container">
          {favorites && favorites.length > 0 && (
            <div className="chips-row">
              <span className="chips-label">Favorites:</span>
              <div className="chips-list">
                {favorites.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setCityName(city);
                      onSearch(city);
                    }}
                    className="chip-btn favorite-chip"
                    aria-label={`Search for favorite city ${city}`}
                  >
                    ★ {city.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {recents && recents.length > 0 && (
            <div className="chips-row">
              <span className="chips-label">Recent:</span>
              <div className="chips-list">
                {recents.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setCityName(city);
                      onSearch(city);
                    }}
                    className="chip-btn recent-chip"
                    aria-label={`Search for recent city ${city}`}
                  >
                    {city.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
