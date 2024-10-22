"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { DayBackgroundImage, NightBackgroundImage } from "@/constants/index";
import Weather from "../Weather";

const Hero = () => {
  const [bgImage, setBgImage] = useState<string>(DayBackgroundImage[0].src); // Default background
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null); //Default Null

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchData = async () => {
    if (!city) return; // Prevent fetch if city is empty
    try {
      const res = await axios.get(url);
      setWeather(res.data);
      console.log(res.data);
      setCity("");
    } catch (error) {
      console.error("Error in fetching data", error);
    }
  };

  useEffect(() => {
    if (weather) {
      const condition = weather.weather[0].main; // Get the main weather condition
      const currentHour = new Date(weather.dt * 1000).getHours(); // Get the current hour
      const isDay = currentHour >= 6 && currentHour < 18; // Determine if it's day or night
      const backgroundImages = isDay
        ? DayBackgroundImage
        : NightBackgroundImage;

      const background =
        backgroundImages.find((bg) => bg.name === condition)?.src ||
        backgroundImages[0].src;
      setBgImage(background);
    }
  }, [weather]); // Trigger this effect when weather changes

  return (
    <div
      className="flex flex-col items-end h-screen w-full "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute border-2 w-1/3 h-full backdrop-blur-md pl-24 shadow-black shadow-lg border-none flex flex-col items-center justify-center 8">
        <h1 className="text-3xl font-semibold pb-4 text-white">Weather App</h1>
        <input
          type="search"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Added onChange handler
          placeholder="Enter city name..."
          className="ml-2 p-2 rounded-xl   "
        />
        <button
          onClick={fetchData}
          className="mt-4 p-2 font-semibold   bg-gray-300 text-black rounded transition duration-300 ease-in-out delay-50 transform hover:bg-gray-500 hover:scale-105"
        >
          Search
        </button>
      </div>
        {/* WEATHER DETAILS */}
      {weather && <Weather data={weather} />}
    </div>
  );
};

export default Hero;
