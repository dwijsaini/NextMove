import { useState } from 'react';
import Home from './pages/Home';
import { fetchPlaces, fetchWeather } from './services/api';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [places, setPlaces] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    console.log('Search requested for:', city);
    setCityName(city);
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setPlaces(null);

    try {
      const [weather, placesData] = await Promise.all([
        fetchWeather(city),
        fetchPlaces(city),
      ]);

      setWeatherData(weather);
      setPlaces(placesData);
    } catch (searchError) {
      setError(searchError.message || 'Something went wrong. Please try again.');
      setWeatherData(null);
      setPlaces(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {error && <p className="app-error">{error}</p>}
      <Home
        cityName={cityName}
        weatherData={weatherData}
        places={places}
        loading={loading}
        onSearch={handleSearch}
      />
    </div>
  );
}

export default App;
