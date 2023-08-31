import { WEATHER_API_KEY } from "../config";
import { Coordinations } from "../types";

export const getGeoCode = async (city: string) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${1}&appid=${WEATHER_API_KEY}`
  );
  const json = await response.json();
  if (json.length >= 1) {
    return { lat: json[0].lat, lon: json[0].lon, name: json[0].name };
  } else {
    return false;
  }
};

export const getWeatherInfo = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();
    return json.list.filter(
      (element: any, index: number) => (index + 1) % 8 === 0
    );
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
