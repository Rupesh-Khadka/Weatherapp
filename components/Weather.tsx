import React from "react";

interface data {}

const Weather = ({ data }) => {
  const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);
  const temperature = kelvinToCelsius(data.main.temp);

  // Convert Unix timestamp to readable time
  const convertTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleTimeString(); // Format time
  };

  const time = convertTime(data.dt);

  return (
    <div className="text-white mt-4">
      <h1>{data.name}</h1>
      <h1 className="text-3xl">{temperature} °C</h1>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Pressure: {data.main.pressure} hPa</p>
      <p>Condition: {data.weather[0].main}</p>
      <p>Time:{time}</p>
    </div>
  );
};

export default Weather;
