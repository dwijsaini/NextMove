import './Card.css';

const WeatherCard = ({ data }) => {
  return (
    <article className="card weather-card">
      <div className="card-header">
        <div>
          <p className="card-label">Current Weather</p>
          <h3>{data.city}</h3>
        </div>
        <span className="weather-icon" aria-hidden="true">☀</span>
      </div>
      <div className="temperature-row">
        <strong>{data.temperature}°C</strong>
        <span>{data.condition}</span>
      </div>
      <div className="weather-stats">
        <p><span>Feels like</span>{data.feelsLike}°C</p>
        <p><span>Humidity</span>{data.humidity}%</p>
        <p><span>Wind</span>{data.wind}</p>
      </div>
    </article>
  );
};

export default WeatherCard;
