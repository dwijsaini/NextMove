import { useState } from 'react';
import Home from './pages/Home';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (city) => {
    console.log('Search requested for:', city);
    setCityName(city);
    setLoading(true);
    setError(null);

    // Placeholder for Rudra and Dwij: call API functions here, then set state.
    setTimeout(() => {
      setWeatherData({
        city,
        temperature: 27,
        condition: 'Clear skies',
        humidity: 58,
        wind: '12 km/h',
        feelsLike: 29,
      });
      setPlaces([
        {
          name: `${city} Old Quarter`,
          description: 'Historic streets, local cafes, and evening walks.',
          tag: 'Culture',
        },
        {
          name: `${city} Viewpoint`,
          description: 'A scenic stop for skyline photos and sunset plans.',
          tag: 'Outdoors',
        },
        {
          name: `${city} Food Market`,
          description: 'Street food, regional snacks, and quick bites nearby.',
          tag: 'Food',
        },
      ]);
      setLoading(false);
    }, 900);
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
