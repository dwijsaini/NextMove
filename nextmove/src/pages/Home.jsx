import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import PlacesCard from '../components/PlacesCard';
import './Home.css';

const Home = ({ cityName, weatherData, places, loading, onSearch }) => {
  const hasData = Boolean(weatherData) && Boolean(places);

  return (
    <div className="home">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Travel info in one clean view</p>
          <h1>Find the weather and the places worth your next stop.</h1>
        </div>
        <SearchBar onSearch={onSearch} loading={loading} />
      </section>

      {!hasData && !loading && (
        <div className="welcome">
          <h2>Search for any city to explore</h2>
          <p>Weather, sights, and local ideas will appear here once you search.</p>
        </div>
      )}

      {loading && (
        <div className="loading" role="status" aria-label="Loading travel information">
          <span className="spinner spinner--page" aria-hidden="true" />
          <p>Getting {cityName || 'your city'} ready...</p>
        </div>
      )}

      {hasData && !loading && (
        <div className="cards-grid">
          <WeatherCard weatherData={weatherData} />
          <PlacesCard placesData={places} />
        </div>
      )}
    </div>
  );
};

export default Home;
