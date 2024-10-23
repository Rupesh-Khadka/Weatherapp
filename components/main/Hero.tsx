"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { DayBackgroundImage, NightBackgroundImage } from "@/constants/index";
import Weather from "../Weather";
import { motion } from "framer-motion";

const Hero = () => {
  const [bgImage, setBgImage] = useState<string>(DayBackgroundImage[0].src); // Default background
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null); //Default Null
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchData = async () => {
    if (!city) return; // Prevent fetch if city is empty
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(url);
      setWeather(res.data);
      console.log(res.data);
      setCity("");
    } catch (error) {
      console.error("Error in fetching data", error);
      setError(true);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

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
      <motion.div
        initial={{ y: -800 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        className="absolute p-8 w-full sm:w-full md:w-1/2 lg:w-1/3 md:h-full lg:h-full backdrop-blur-md shadow-black shadow-xl border-none flex flex-col items-center md:justify-center lg:items-center  overflow-hidden"
      >
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 80, delay: 1.5 }}
          className="text-5xl  sm:text-4xl font-semibold pb-4 text-white text-center"
        >
          Weather App
        </motion.div>
        {error && (
          <div className="text-sm font-bold text-red-700 mt-2">
            * Please enter the correct city name
          </div>
        )}
        {loading ? ( // Conditional rendering for loading screen
          <div className="text-lg font-semibold text-white duration-0">
            Loading...
          </div> // Loading message
        ) : (
          <>
            <motion.input
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 80, delay: 1.7 }}
              type="search"
              value={city}
              onChange={handleChange}
              placeholder="Type a city name to get the weather..."
              className={`ml-2 p-3 rounded-xl w-1/2 md:w-1/2 lg:w-1/2 text-black ${
                error ? "border-2 border-red-500" : ""
              }`}
            />
            <motion.button
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 80, delay: 1 }}
              onClick={fetchData}
              className="mt-4 p-2 font-semibold bg-gray-400 text-black rounded-lg transition duration-300 ease-in-out delay-50 transform hover:bg-gray-500 hover:scale-105"
            >
              Search
            </motion.button>
          </>
        )}
      </motion.div>
      {weather && <Weather data={weather} />}
    </div>
  );
};

export default Hero;
