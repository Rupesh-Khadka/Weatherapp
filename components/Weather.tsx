import React from "react";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  dt: number;
  name: string;
}

interface WeatherProps {
  data: WeatherData;
}

const Weather: React.FC<WeatherProps> = ({ data }) => {
  const kelvinToCelsius = (temp: number) => (temp - 273.15).toFixed(2);
  const temperature = kelvinToCelsius(data.main.temp);

  // Convert Unix timestamp to readable time
  const convertTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleTimeString(); // Format time
  };

  const time = convertTime(data.dt);
  const iconCode = data.weather[0]?.icon || ""; //Get the icon code
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="text-white mt-4">
      <h1>{data.name}</h1>
      <h1 className="text-3xl">{temperature} °C</h1>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Pressure: {data.main.pressure} hPa</p>
      <p>Condition: {data.weather[0].main}</p>
      <img src={iconUrl} alt={data.weather[0].main} className="weather-icon" />
      <p>Time:{time}</p>
    </div>
  );
};

export default Weather;
