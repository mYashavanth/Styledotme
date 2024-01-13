# Weather Forecast Application

## Overview

This single-page weather forecast application provides users with real-time weather details and a 5-day forecast for a selected city. The application is designed to be user-friendly, responsive, and includes additional features for enhanced user experience.

## Features

1. **Search by City:**
   - Users can enter a city name to view the current weather details, including temperature, humidity, wind speed, and weather description.
   - The application displays an appropriate weather icon reflecting the current conditions.

2. **5-Day Forecast:**
   - Users can view a 5-day forecast for the selected city, including date, average temperature, and weather description.
   - Each day's forecast is accompanied by a corresponding weather icon.

3. **Unit Conversion:**
   - The application supports both Celsius and Fahrenheit temperature units.
   - Users can toggle between Celsius and Fahrenheit with a dedicated button, updating all temperature values accordingly.

4. **Location-Based Loading:**
   - Upon page load, the application requests permission to access the user's location.
   - If permission is granted, the map displays the current location's weather details; otherwise, it defaults to a predefined location (e.g., Delhi).

5. **Responsive Design:**
   - The application is designed to be responsive, ensuring a seamless user experience across various screen sizes and devices.

6. **Temperature Unit Toggle Button:**
   - A convenient toggle button allows users to switch between Celsius and Fahrenheit units effortlessly.

## Technical Details

### API Used

The application utilizes the [OpenWeatherMap API](https://openweathermap.org/){:target="_blank"} to fetch real-time weather data and forecasts for the specified city.

### Technologies Used

- HTML5
- CSS3
- JavaScript
- [OpenWeatherMap API](https://openweathermap.org/){:target="_blank"} for weather data
- Responsive design using media queries

### How to Run

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser.

## Screenshots

![Screenshot 1](/src/Images/LaptopView.png)
*Weather details for a specified city Laptop View*

![Screenshot 2](/src/Images/MobileView.png)
*Weather details for a specified city Mobile View*

## Demo

[Live Demo](https://styledotme.vercel.app/){:target="_blank"}

## Known Issues

- There might be occasional delays in fetching real-time data from the OpenWeatherMap API.

## Future Enhancements

- Include additional weather parameters such as pressure and visibility.
- Implement geolocation-based suggestions for city search.
- Provide an option for users to save their favorite cities.

Feel free to contribute to this project by forking and submitting a pull request. If you encounter any issues or have suggestions for improvement, please open an issue on the GitHub repository.

Enjoy the weather updates with our Weather Forecast Application!
