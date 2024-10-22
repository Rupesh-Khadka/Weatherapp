"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {  DayBackgroundImage } from "@/constants/index";
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
      setCity('');
    } catch (error) {
      console.error("Error in fetching data", error);
    }
  };

  useEffect(() => {
    if (weather) {
      const condition = weather.weather[0].main; // Get the main weather condition
      const background =
        DayBackgroundImage.find((bg) => bg.name === condition)?.src ||
        DayBackgroundImage[0].src;
      setBgImage(background);
    }
  }, [weather]); // Trigger this effect when weather changes

  return (
    <div
      className="flex items-center justify-center h-screen w-full"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute flex flex-col items-center justify-center z-[20] bg-black bg-opacity-30 p-8">
        <h1 className="text-2xl text-white">Weather App</h1>
        <input
          type="search"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Added onChange handler
          placeholder="Enter city name"
          className="ml-2 p-2 rounded"
        />
        <button
          onClick={fetchData}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>

        
        {/* WEATHER DETAILS */}

        {weather && <Weather data={weather} />}
      </div>
    </div>
  );
};

export default Hero;
