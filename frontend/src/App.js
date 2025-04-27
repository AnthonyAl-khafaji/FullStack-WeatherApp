import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchInput, setSearchInput] = useState("Detroit, Michigan");
  const [location, setLocation] = useState("Detroit, Michigan");
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("C");
  const [validationError, setValidationError] = useState("");

  const fetchWeather = async () => {
    setValidationError("");

    const parts = searchInput.split(",");
    if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) {
      setValidationError("Please enter location in the format: City, State (e.g., Detroit, Michigan)");
      return;
    }

    try {
      const response = await fetch(`/api/weather?location=${searchInput}&days=7`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setWeatherData(data);
      setLocation(searchInput); // ✅ Only update display name after successful fetch
    } catch (error) {
      console.error("Error fetching weather:", error);
      setValidationError("Unable to fetch weather. Please check your input and try again.");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const toggleUnit = () => {
    setUnit(prev => (prev === "C" ? "F" : "C"));
  };

  const getBackgroundClass = () => {
    if (!weatherData || !weatherData.current || !weatherData.current.condition) return "default";
    const condition = weatherData.current.condition.text.toLowerCase();
    if (condition.includes("sunny") || condition.includes("clear")) return "sunny";
    if (condition.includes("rain")) return "rainy";
    if (condition.includes("cloud")) return "cloudy";
    if (condition.includes("snow")) return "snowy";
    if (condition.includes("thunder")) return "thunder";
    return "default";
  };

  const renderForecast = () => {
    if (!weatherData?.forecast?.forecastday) return null;
    return (
      <div className="forecast-section">
        <h3>Forecast</h3>
        <div className="forecast-grid">
          {weatherData.forecast.forecastday.slice(0, 7).map((day, index) => (
            <div key={index} className="forecast-day">
              <p><strong>{day.date}</strong></p>
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="forecast-icon"
              />
              <p>{day.day.condition.text}</p>
              <p>
                Avg Temp:{" "}
                {unit === "C" ? `${day.day.avgtemp_c} °C` : `${day.day.avgtemp_f} °F`}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAlerts = () => {
    if (weatherData?.alerts?.alert) {
      const seen = new Set();
      const uniqueAlerts = weatherData.alerts.alert.filter(alert => {
        const key = `${alert.event}|${alert.description}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      return (
        <div className="alerts-section">
          <h3>Alerts</h3>
          {uniqueAlerts.map((alert, index) => (
            <div key={index} className="alert">
              <p><strong>{alert.event}</strong></p>
              <p>{alert.description}</p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderWeatherAnimation = () => {
    if (!weatherData?.current) return null;
    const condition = weatherData.current.condition.text.toLowerCase();

    if (condition.includes("sunny") || condition.includes("clear")) {
      return <div className="weather-animation sun"></div>;
    }
    if (condition.includes("cloud")) {
      return <div className="weather-animation cloud"></div>;
    }
    if (condition.includes("rain")) {
      return <div className="weather-animation rain"></div>;
    }
    if (condition.includes("snow")) {
      return <div className="weather-animation snow"></div>;
    }
    return null;
  };

  return (
    <div className={`app-container ${getBackgroundClass()}`}>
      <h1>SmartWeather</h1>
      <div className="controls">
        <div className="search-box">
          <input 
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter city, state (e.g., Detroit, Michigan)" 
          />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>
        {validationError && <p className="error-message">{validationError}</p>}
        <button className="unit-toggle" onClick={toggleUnit}>
          Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
        </button>
      </div>
      {weatherData ? (
        <div className="weather-info">
          {renderWeatherAnimation()}
          <h2>Weather in {location}</h2>
          <p>
            <strong>Temperature:</strong>{" "}
            {unit === "C"
              ? `${weatherData.current?.temp_c || "--"} °C`
              : `${weatherData.current?.temp_f || "--"} °F`}
          </p>
          <p><strong>Condition:</strong> {weatherData.current?.condition?.text || "N/A"}</p>
          <p><strong>Humidity:</strong> {weatherData.current?.humidity || "--"}%</p>
          <p><strong>Wind:</strong> {weatherData.current?.wind_kph || "--"} kph</p>
          {renderForecast()}
          {renderAlerts()}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default App;
