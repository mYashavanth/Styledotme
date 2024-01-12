import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";
import axios from "axios";
import Weather from "./Weather";
import Forcast from "./Forcast";

export default function Home() {
  const apiKey = "1b9f718d43b4721dd314069ebb6e4ebd";
  const { city, setCity, dateTime, celsius, setCelsius } =
    useContext(AuthContext);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
      });
    } else {
      console.log("Geolocation not supported");
      fetchData();
    }

    function success(position) {
      const { latitude, longitude } = position.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      setLocation({ latitude, longitude });
    }

    function error() {
      console.log("Turn on your location to get the accurate weather");
      fetchData();
    }
  }, []); // Empty dependency array ensures that this effect runs once on mount

  useEffect(() => {
    if (location) {
      fetchDataCurrentLocation(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchDataCurrentLocation = async (lat, lon) => {
    try {
      setLoading(true);
      let weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      let forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
      setError(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    } finally {
      setLoading(false);
      setCity("");
    }
  };

  async function fetchData() {
    try {
      setLoading(true);
      let weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      let forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
      setError(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    } finally {
      setLoading(false);
      setCity("");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  console.log(weatherData);
  console.log(forecastData);
  console.log(celsius);

  return (
    <>
      <div className={styles.searchBar}>
        <div className={styles.searchCont}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search by city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button className={styles.searchBtn} type="submit">
              Search
            </button>
          </form>
          <button className={styles.units} onClick={() => setCelsius(!celsius)}>
            {" "}
            Units(°C/°F )
          </button>
        </div>

        {error ? (
          ""
        ) : (
          <div className={styles.location}>
            <h1>{weatherData?.name}</h1>
            <p>{dateTime(weatherData?.dt)}</p>
          </div>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <h1 style={{ color: "rgba(40, 13, 13, 0.761)", textAlign: "center" }}>
          Enter a valied city Name
        </h1>
      ) : (
        <>
          <Weather data={weatherData} />
          <Forcast forcastData={forecastData} />
        </>
      )}
    </>
  );
}
