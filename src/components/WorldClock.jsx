import React, { useState, useEffect } from 'react';
import './WorldClock.css';

const timeZones = [
  { city: "New York", timeZone: "America/New_York" },
  { city: "London", timeZone: "Europe/London" },
  { city: "Tokyo", timeZone: "Asia/Tokyo" },
  { city: "Sydney", timeZone: "Australia/Sydney" }
];

const Clock = ({ city, timeZone }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

  return () => clearInterval(interval);
  }, []);

  /** Format the time for a specific time zone */
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, 
  }; 
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    /** Spread the properties of 'options' here */
    ...options,
    /** Add a specific property for timeZone */
    timeZone: timeZone,
  });

  const formattedTime = timeFormatter.format(time);

  return (
  <div className="clock-container">
    <div className="city-name">{city}</div>
    <div className="clock-face">
      <div className="time-display">{formattedTime}</div>
    </div>
  </div>
  );
};

const WorldClock = () => {
  /**Default theme is light */
  const [theme, setTheme] = useState('light'); 
  /**Load theme from localStorage on page load */
  useEffect(() => {
    const savedTheme =localStorage.getItem('theme');
    if(savedTheme){
      setTheme(savedTheme);
    }
  }, []);

  /** Toggle theme between light and dark */
  const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      /** Save theme to localStorage */
      localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`world-clock ${theme}`}>
      <h1>World Clock</h1>
      <button className='theme-toggle' onClick={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
      <div className="clock-list">
        {timeZones.map((zone) => (
          <Clock key={zone.city} city={zone.city} timeZone={zone.timeZone} />
        ))}
      </div>
    </div>
  );
};

export default WorldClock;
