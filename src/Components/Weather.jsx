import React, { useContext } from "react";
import styles from "./Weather.module.css";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import { BsSunrise, BsSunset } from "react-icons/bs";

const Weather = ({ data }) => {
  const { dateTime, direction, celsius, celsiusToFahrenheit } =
    useContext(AuthContext);
  const finalData = {
    date: dateTime(data.dt),
    cityName: data.name,
    country: data.sys.country,
    temp: data.main.temp,
    minTemp: data.main.temp_min,
    maxTemp: data.main.temp_max,
    feels: data.main.feels_like,
    description: data.weather[0].description,
    main: data.weather[0].main,
    icon: data.weather[0].icon,
    windSpeed: data.wind.speed,
    windDirection: direction(data.wind.deg),
    humidity: data.main.humidity,
    hPa: data.main.pressure,
    visibility: data.visibility,
    sunrise: dateTime(data.sys.sunrise),
    sunset: dateTime(data.sys.sunset),
  };

  const mapUrl = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  console.log(finalData);
  return (
    <div className={styles.container}>
      <div className={styles.weatherData}>
        <div className={styles.mainTempImg}>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${finalData.icon}@2x.png`}
              alt="imag"
            />
          </div>
          <div className={styles.tempCont}>
            <h1>
              {celsius
                ? finalData.temp
                : celsiusToFahrenheit(finalData.temp).toFixed(2)}
              {celsius ? "°C" : "°F"}
            </h1>
            <p>{finalData.description}</p>
          </div>
        </div>
        <div className={styles.dataCont}>
          <div className={styles.datas}>
            <div>
              <FaTemperatureHigh className={styles.icon} />
            </div>
            <div>
              <h2>
                {celsius
                  ? finalData.maxTemp
                  : celsiusToFahrenheit(finalData.maxTemp).toFixed(2)}
                {celsius ? "°C" : "°F"}
              </h2>
              <p>maximum</p>
            </div>
          </div>

          <div className={styles.datas}>
            <div>
              <WiHumidity className={styles.icon} />
            </div>
            <div>
              <h2>{finalData.humidity}%</h2>
              <p>humidity</p>
            </div>
          </div>

          <div className={styles.datas}>
            <div>
              <LuWind className={styles.icon} />
            </div>
            <div>
              <h2>
                {finalData.windSpeed} {finalData.windDirection}
              </h2>
              <p>wind speed in km/h</p>
            </div>
          </div>

          <div className={styles.datas}>
            <div>
              <FaTemperatureLow className={styles.icon} />
            </div>
            <div>
              <h2>
                {celsius
                  ? finalData.minTemp
                  : celsiusToFahrenheit(finalData.minTemp).toFixed(2)}
                {celsius ? "°C" : "°F"}
              </h2>
              <p>minimum</p>
            </div>
          </div>

          <div className={styles.datas}>
            <div>
              <BsSunrise className={styles.icon} />
            </div>
            <div>
              <h2>{finalData.sunrise}</h2>
              <p>sunrise</p>
            </div>
          </div>

          <div className={styles.datas}>
            <div>
              <BsSunset className={styles.icon} />
            </div>
            <div>
              <h2>{finalData.sunset}</h2>
              <p>sunset</p>
            </div>
          </div>
        </div>
      </div>
      <div id="bodyCont" className={styles.bodyCont}>
        <div id="map" style={{ height: "460px" }}>
          <iframe
            width="100%"
            height="100%"
            id="gmap_canvas"
            src={mapUrl}
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
          ></iframe>
          <style>{`.mapouter{position:relative;text-align:right;height:500px;width:600px;}`}</style>
          <a href="https://www.embedgooglemap.net"></a>
          <style>{`.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}`}</style>
        </div>
      </div>
    </div>
  );
};

export default Weather;
