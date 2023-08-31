import React, { useEffect, useState } from "react";
import styles from "./Info.module.css";
import "../../App.css";
import icon from "../../assets/digital_camera_photo-1080x675.jpg";
import Chart from "../Chart/Chart";
import { Coordinations } from "../../types";
import { getWeatherInfo } from "../../apiCalls/WeatherApiCall";
type InfoProps = {
  data: any;
};
type CurrentWeather = {
  temp: number;
  humidity: number;
  wind: number;
  city: string;
  icon: string;
};

function Info({ data }: InfoProps) {
  const [currentInfo, setCurrentInfo] = useState<CurrentWeather | null>(null);
  const [chartData, setChartData] = useState<[]>([]);
  useEffect(() => {
    if (data) {
      getWeatherInfo(data.lat, data.lon).then((res) => {
        setCurrentInfo({
          temp: res[0].main.temp,
          humidity: res[0].main.humidity,
          wind: res[0].wind.speed,
          city: data.name,
          icon: res[0].weather[0].icon,
        });
        setChartData(res);
      });
    }
  }, [data.lon, data.lat]);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.info}>
        <p className="text">Current Weather for {currentInfo?.city}</p>
        <div className={styles.container}>
          <div>
            <img
              className={styles.icon}
              src={`http://openweathermap.org/img/wn/${currentInfo?.icon}.png`}
            />
          </div>
          <div>
            <div className={styles.metricValues}>
              <p className="text">Temperature: </p>
              <span>{currentInfo?.temp}</span>
            </div>
            <div className={styles.metricValues}>
              <p className="text">Humidity: </p>
              <span>{currentInfo?.humidity}</span>
            </div>
            <div className={styles.metricValues}>
              <p className="text">Wind Speed: </p>
              <span>{currentInfo?.wind}</span>
            </div>
          </div>
        </div>
      </div>
      <Chart chartData={chartData} />
    </div>
  );
}

export default Info;
