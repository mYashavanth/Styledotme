import React, { useContext } from "react";
import styles from "./Forcast.module.css";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";

export default function Forcast({ forcastData }) {

  console.log(forcastData);
  const {celsius, celsiusToFahrenheit} = useContext(AuthContext);
  const decodeAndExtractData = (weatherData) => {
    const groupedByDay = {};

    // Group data by day
    weatherData.list.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0];
      if (!groupedByDay[date] && Object.keys(groupedByDay).length < 6) {
        if (!groupedByDay[date]) {
          groupedByDay[date] = {
            dates: [],
            temperatures: [],
            descriptions: [],
            icons: [],
          };
        }

        groupedByDay[date].dates.push(entry.dt_txt);
        groupedByDay[date].temperatures.push(entry.main.temp);
        groupedByDay[date].descriptions.push(entry.weather[0].description);
        groupedByDay[date].icons.push(entry.weather[0].icon);
      }
    });

    // Extracted data for each day
    const decodedData = Object.entries(groupedByDay).map(([date, data]) => ({
      date: date,
      averageTemperature:
        data.temperatures.reduce((sum, temp) => sum + temp, 0) /
        data.temperatures.length,
      description: data.descriptions[0], // Taking the description of the first entry of the day
      icon: data.icons[0], // Taking the icon code of the first entry of the day
    }));

    return decodedData;
  };
  console.log(decodeAndExtractData(forcastData));
  const finslForcast = decodeAndExtractData(forcastData);
  return (
    <div className={styles.container}>
      {finslForcast.map((data, index) => (
        <div key={index} className={styles.card}>
          <h2>{data.date}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt="weather"
          />
          <h3>{data.description}</h3>
          <h3>
            {celsius
              ? data.averageTemperature
              : celsiusToFahrenheit(data.averageTemperature).toFixed(2)}
            {celsius ? "°C" : "°F"}
          </h3>
        </div>
      ))}
    </div>
  );
}
