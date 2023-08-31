import React, { useEffect, useState } from "react";
import styles from "./Searchbar.module.css";
import "../../App.css";
import { getGeoCode } from "../../apiCalls/WeatherApiCall";
import Info from "../Info/Info";
import { Coordinations } from "../../types";

function SearchBar() {
  const [cityGeo, setCityGeo] = useState<Coordinations | boolean>({
    lat: 49.841952,
    lon: 24.0315921,
    name: "Lviv",
  });
  const [city, setCity] = useState("");
  const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  const showCityWeather = () => {
    getGeoCode(city).then((data) => {
      setCityGeo(data);
      // console.log(data);
    });
    setCity("");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputBlock}>
          <label className="text" htmlFor="city">
            Name of City
          </label>
          <input
            placeholder={!cityGeo ? "Please enter correct city name" : "City"}
            id="city"
            type="text"
            className={!cityGeo ? styles.inputError : styles.input}
            value={city}
            onChange={onChangeCity}
          />
          <button onClick={showCityWeather} className={styles.button}>
            Search
          </button>
        </div>
      </div>
      <Info data={cityGeo} />
    </>
  );
}

export default SearchBar;
