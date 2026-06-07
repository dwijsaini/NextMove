import { useEffect, useState } from 'react';
import './LocalClock.css';

const getLocalTimeObj = (offsetInSeconds) => {
  const now = new Date();
  const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utcMs + (offsetInSeconds * 1000));
};

const formatTimezoneOffset = (offsetInSeconds) => {
  const hours = Math.floor(Math.abs(offsetInSeconds) / 3600);
  const minutes = Math.floor((Math.abs(offsetInSeconds) % 3600) / 60);
  const sign = offsetInSeconds >= 0 ? '+' : '-';
  return `UTC ${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
};

const LocalClock = ({ timezoneOffset, cityName }) => {
  const [time, setTime] = useState(() => getLocalTimeObj(timezoneOffset || 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getLocalTimeObj(timezoneOffset || 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezoneOffset]);

  if (timezoneOffset === undefined || timezoneOffset === null) return null;

  const hours = time.getHours();
  const isDay = hours >= 6 && hours < 18; // 6 AM to 6 PM is day
  
  const timeString = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateString = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`local-clock-card ${isDay ? 'is-day' : 'is-night'}`}>
      <div className="clock-content">
        <div className="clock-left">
          <p className="clock-label">Local Time in {cityName}</p>
          <span className="clock-time" aria-live="off">{timeString}</span>
          <span className="clock-date">{dateString}</span>
        </div>
        
        <div className="clock-right">
          <div className="indicator-icon-wrap">
            {isDay ? (
              // Sun Graphic
              <svg className="indicator-icon sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="5" fill="#f59e0b" stroke="#f59e0b" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M5.64 18.36l-1.42 1.42M19.78 4.22l-1.42 1.42" strokeLinecap="round" />
              </svg>
            ) : (
              // Moon Graphic
              <svg className="indicator-icon moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#94a3b8" stroke="#94a3b8" />
              </svg>
            )}
          </div>
          <span className="indicator-label">{isDay ? 'Daytime' : 'Nighttime'}</span>
          <span className="timezone-offset-badge">{formatTimezoneOffset(timezoneOffset)}</span>
        </div>
      </div>
    </div>
  );
};

export default LocalClock;
