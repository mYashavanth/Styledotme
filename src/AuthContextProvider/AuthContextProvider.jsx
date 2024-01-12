import React, { createContext } from "react";

export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [city, setCity] = React.useState("Delhi");
  const [celsius, setCelsius] = React.useState(true);

  function dateTime(time) {
    let amOrpm;
    let dateTime = new Date(time * 1000);
    let month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "may",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Now",
      "Dec",
    ];
    let hour;
    let date;
    let min;
    if (dateTime.getHours() % 12 < 10) {
      hour = `0${dateTime.getHours() % 12}`;
    } else {
      hour = `${dateTime.getHours() % 12}`;
    }
    if (dateTime.getDate() < 10) {
      date = `0${dateTime.getDate()}`;
    } else {
      date = `${dateTime.getDate()}`;
    }
    if (dateTime.getMinutes() < 10) {
      min = `0${dateTime.getMinutes()}`;
    } else {
      min = `${dateTime.getMinutes()}`;
    }
    if (dateTime.getHours() > 12) {
      amOrpm = "PM";
    } else {
      amOrpm = "AM";
    }
    return `${month[dateTime.getMonth()]} ${date}, ${hour}:${min} ${amOrpm}`;
  }
  // function To convert deg to direction
  function direction(deg) {
    let directions = [
      "Northerly",
      "North Easterly",
      "Easterly",
      "South Easterly",
      "Southerly",
      "South Westerly",
      "Westerly",
      "North Westerly",
    ];

    deg += 22.5;

    if (deg < 0) deg = 360 - (Math.abs(deg) % 360);
    else deg = deg % 360;

    let w = parseInt(deg / 45);
    return directions[w];
  }
  function celsiusToFahrenheit(temp) {
    return (temp * 9) / 5 + 32;
  }
  return (
    <AuthContext.Provider
      value={{
        city,
        setCity,
        dateTime,
        direction,
        celsiusToFahrenheit,
        celsius,
        setCelsius,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
