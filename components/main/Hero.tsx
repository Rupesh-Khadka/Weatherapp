"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Bg from "@/Public/chan-hoi-uj-w-v7OFT4-unsplash.jpg";
import { BackgroundImage } from "@/constants";

interface Props {
  src: string;
  width: number;
  height: number;
  index: number;
}

const Hero = () => {
  const bgImage = BackgroundImage[0];
  const [city, setCity] = useState("");  
  const [weather, setWeather] = useState(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=bhaktapur&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      setWeather(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error in fetching data", error);
    }
  };

  return (
    <div className="absolute flex flex-col h-full w-full top-0 right-0 bottom-0 z-[1]">
      <Image
        src={bgImage.src}
        alt={bgImage.skill_name}
        fill
        className="object-cover"
      />
      <div className="relative flex flex-col items-center justify-center z-[20]">
        <p>Weather App</p>
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
      </div>
    </div>
  );
};

export default Hero;
