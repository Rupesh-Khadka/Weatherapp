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
  const kelvinToCelsius = (temp: number) => (temp - 273.15).toFixed(0);
  const temperature = kelvinToCelsius(data.main.temp);

  // Convert Unix timestamp to readable time
  const convertTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Format time without sec
  };

  // CONVERT TO DAYS

  const convertDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "long" }); // Format to get the day name
  };

  // DAY or NIGHT
  const getDayNight = () => {
    const hours = new Date(data.dt * 1000).getHours();
    return hours >= 6 && hours < 18 ? "Day" : "Night";
  };

  const time = convertTime(data.dt); // GET Time
  const iconCode = data.weather[0]?.icon || ""; // Get the icon code
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const day = convertDay(data.dt); //GET DAY
  const dayNight = getDayNight(); // GET DAYS or NIGHT

  return (
    <div className="h-screen w-full  flex justify-between text-white  ">
      <div className="flex items-end py-10 px-12 w-full ">
        <div className="  h-38  w-1/2 flex ">
          {/* For TEMPERATUE */}
          <div className="item-end flex h-full ">
            <h1 className="text-9xl  font-semibold">{temperature}°C </h1>
          </div>
          {/* FOR TIME DAY */}
          <div className="pl-6 pt-4 flex flex-col ">
            <p className="text-5xl pt-2 font-semibold font-sans">{data.name}</p>
            <div className="flex">
              <p className="pt-1 text-2xl font-semibold font-sans"> {time} </p>
              <p className="pt-1 pl-2 text-2xl font-semibold font-sans">
                {day}
              </p>
            </div>
          </div>
          <div className="">
            <img
              src={iconUrl}
              alt={data.weather[0].description}
              className="weather-icon text-white"
            />
            <p className=" border-2 text-lg  font-sans font-semibold pl-6">
              {data.weather[0].main}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      {/* <div className="border-2 w-1/3 backdrop-blur-md pl-24 shadow-black shadow-lg border-none flex flex-col  justify-center  ">
        <h1 className="text-5xl font-bold py-4 font-sans">{data.name}</h1>

        <p>Humidity: {data.main.humidity}%</p>
        <p>Pressure: {data.main.pressure} hPa</p>
        <p className="">{dayNight}</p>
      </div> */}
    </div>
  );
};

export default Weather;
