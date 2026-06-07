import { useState, useEffect } from 'react';
import Home from './pages/Home';
import { fetchPlaces, fetchWeather, fetchForecast } from './services/api';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [places, setPlaces] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [announcement, setAnnouncement] = useState('');

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [recents, setRecents] = useState(() => {
    const saved = localStorage.getItem('recents');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (city) => {
    setFavorites((prev) => {
      const next = prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  const addRecent = (city) => {
    setRecents((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase());
      const next = [city, ...filtered].slice(0, 5);
      localStorage.setItem('recents', JSON.stringify(next));
      return next;
    });
  };

  const handleSearch = async (city) => {
    console.log('Search requested for:', city);
    // Extract search query name without full details if user selected suggestions
    const shortCityName = city.split(',')[0].trim();
    setCityName(shortCityName);
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setPlaces(null);
    setForecastData(null);
    setAnnouncement(`Searching travel information for ${city}...`);

    try {
      const [weather, placesData, forecast] = await Promise.all([
        fetchWeather(shortCityName),
        fetchPlaces(shortCityName),
        fetchForecast(shortCityName),
      ]);

      setWeatherData(weather);
      setPlaces(placesData);
      setForecastData(forecast);

      const fullCityTitle = weather.city ? `${weather.city}, ${weather.country}` : city;
      addRecent(fullCityTitle);

      setAnnouncement(`Loaded travel details for ${weather.city || city}. Weather is ${Math.round(weather.temp)} degrees Celsius, ${weather.description}.`);
    } catch (searchError) {
      const errMsg = searchError.message || 'Something went wrong. Please try again.';
      setError(errMsg);
      setWeatherData(null);
      setPlaces(null);
      setForecastData(null);
      setAnnouncement(`Error: ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weatherData && places) {
      const formattedCityName = weatherData.city || cityName;
      document.title = `${formattedCityName} Travel Guide & Weather - NextMove`;

      // Update Meta Description dynamically
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      const descriptionText = `Discover ${formattedCityName}, ${weatherData.country || ''}. Current temperature is ${Math.round(weatherData.temp)}°C with ${weatherData.description}. Explore attractions like ${places.attractions.map(a => a.title).join(', ')}.`;
      metaDesc.setAttribute('content', descriptionText);

      // Update OpenGraph Title and Description
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', `${formattedCityName} Travel Guide & Weather - NextMove`);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', descriptionText);

      // Structured Data (JSON-LD schema)
      let schemaScript = document.getElementById('schema-jsonld');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'schema-jsonld';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }

      const schemaData = {
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        "name": formattedCityName,
        "containedInPlace": {
          "@type": "Country",
          "name": weatherData.country || ''
        },
        "description": places.summary?.extract || '',
        "image": places.image || '',
        "touristType": ["Sightseeing", "Adventure", "Culture"]
      };
      schemaScript.textContent = JSON.stringify(schemaData);
    } else {
      document.title = 'NextMove - Smart Weather & Destination Guide';
      const schemaScript = document.getElementById('schema-jsonld');
      if (schemaScript) {
        schemaScript.remove();
      }
    }
  }, [weatherData, places, cityName]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo-section">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <span className="logo-text">NextMove</span>
        </div>
        <ThemeToggle />
      </header>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
      {error && <p className="app-error" role="alert">{error}</p>}
      <Home
        cityName={cityName}
        weatherData={weatherData}
        places={places}
        forecastData={forecastData}
        loading={loading}
        onSearch={handleSearch}
        recents={recents}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;
