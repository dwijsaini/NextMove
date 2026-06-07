import './ForecastStrip.css';

const ForecastStrip = ({ forecastData }) => {
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="forecast-card">
      <h4 className="forecast-title">5-Day Weather Forecast</h4>
      <div className="forecast-strip">
        {forecastData.map((day, index) => (
          <div key={index} className="forecast-day-pill">
            <span className="forecast-day-name">{day.dayName}</span>
            <span className="forecast-date-str">{day.dateStr}</span>
            
            <div className="forecast-icon-wrap">
              {day.icon ? (
                <img className="forecast-icon" src={day.icon} alt={day.description} />
              ) : (
                <span className="forecast-icon-placeholder" aria-hidden="true">☀</span>
              )}
            </div>
            
            <div className="forecast-temps">
              <span className="temp-max" title="Max Temperature">{Math.round(day.temp_max || day.temp)}°</span>
              <span className="temp-min" title="Min Temperature">{Math.round(day.temp_min || day.temp)}°</span>
            </div>
            
            <span className="forecast-desc" title={day.description}>
              {day.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastStrip;
