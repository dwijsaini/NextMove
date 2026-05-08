import './Card.css';

const capitalize = (value = '') => value.charAt(0).toUpperCase() + value.slice(1);

const normalizeWeatherData = (weatherData) => {
  if (!weatherData) {
    return null;
  }

  return {
    city: weatherData.city,
    country: weatherData.country,
    temp: weatherData.temp ?? weatherData.temperature,
    feels_like: weatherData.feels_like ?? weatherData.feelsLike,
    humidity: weatherData.humidity,
    description: weatherData.description ?? weatherData.condition,
    icon: weatherData.icon,
  };
};

const WeatherCard = ({ weatherData, data }) => {
  const weather = normalizeWeatherData(weatherData ?? data);

  if (!weather) {
    return null;
  }

  return (
    <article className="card weather-card">
      <div className="card-header">
        <div>
          <p className="card-label">Current Weather</p>
          <h3>
            {weather.city}
            {weather.country ? <span>, {weather.country}</span> : null}
          </h3>
        </div>
        {weather.icon ? (
          <img className="weather-icon-img" src={weather.icon} alt={weather.description} />
        ) : (
          <span className="weather-icon" aria-hidden="true">☀</span>
        )}
      </div>
      <div className="temperature-row">
        <strong>{Math.round(weather.temp)}°C</strong>
        <span>{capitalize(weather.description)}</span>
      </div>
      <div className="weather-stats">
        <p><span>Feels like</span>{Math.round(weather.feels_like)}°C</p>
        <p><span>Humidity</span>{weather.humidity}%</p>
      </div>
    </article>
  );
};

export default WeatherCard;
