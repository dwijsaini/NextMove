import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import PlacesCard from '../components/PlacesCard';
import SkeletonCard from '../components/SkeletonCard';
import BestTimeWidget from '../components/BestTimeWidget';
import ForecastStrip from '../components/ForecastStrip';
import LocalClock from '../components/LocalClock';
import MapCard from '../components/MapCard';
import CurrencyEstimator from '../components/CurrencyEstimator';
import Phrasebook from '../components/Phrasebook';
import './Home.css';

const Home = ({
  cityName,
  weatherData,
  places,
  forecastData,
  loading,
  onSearch,
  recents,
  favorites,
  toggleFavorite,
}) => {
  const hasData = Boolean(weatherData) && Boolean(places);

  return (
    <div className="home">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Travel info in one clean view</p>
          <h1>Find the weather and the places worth your next stop.</h1>
        </div>
        <SearchBar
          onSearch={onSearch}
          loading={loading}
          recents={recents}
          favorites={favorites}
        />
      </section>

      {!hasData && !loading && (
        <div className="welcome">
          <h2>Search for any city to explore</h2>
          <p>Weather, sights, and local ideas will appear here once you search.</p>
        </div>
      )}

      {loading && <SkeletonCard />}

      {hasData && !loading && (
        <div className="cards-grid">
          <div className="home-column home-column-left">
            <LocalClock
              key={`${weatherData.city}-${weatherData.timezone}`}
              timezoneOffset={weatherData.timezone}
              cityName={weatherData.city}
            />
            <WeatherCard
              weatherData={weatherData}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
            <ForecastStrip forecastData={forecastData} />
            {weatherData.country && (
              <CurrencyEstimator countryCode={weatherData.country} />
            )}
            {weatherData.country && (
              <Phrasebook countryCode={weatherData.country} />
            )}
            <BestTimeWidget city={cityName} />
          </div>
          <div className="home-column home-column-right">
            <PlacesCard placesData={places} />
            {weatherData.coord && (
              <MapCard
                coord={weatherData.coord}
                cityName={weatherData.city}
                attractions={places.attractions}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
