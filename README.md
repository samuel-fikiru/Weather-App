# Weather App

A simple and responsive weather application built with HTML, CSS, and JavaScript.  
Fetches real-time weather data from OpenWeatherMap API based on user input.

---

## Features
- Search for any location worldwide
- Handles multiple location results with country code selection
- Displays current weather, temperature, humidity, and location info
- User-friendly interface with loading and error messages

---

## Demo Screenshots

### Multiple Selection of Locations
![Multi-selection](demo/multi-selection.png)

### Weather Data Display
![Weather Data](demo/weather-data.png)

### Error UI
![Error UI](demo/error-ui.png)

---

## Live Demo

Check out the live version of the app here:

[🌤️ View Live Weather App](https://weather-app-one-beta-46.vercel.app/)

---


## How to Use
1. Open the `index.html` file in your browser.
2. Enter a location name in the search bar.
3. View the weather details or handle errors if location is invalid.

---

## Setup Instructions | Using Your Own API Key
This project uses the OpenWeather API. To run the project with your own API key:
Create an account at OpenWeather then You need to obtain an API key from [OpenWeatherMap](https://openweathermap.org/api).
In your Vercel project, go to Settings → Environment Variables.
Add the following environment variable:
OPENWEATHER_API_KEY=your_api_key_here 
Make sure the variable is enabled for the environment you're deploying to.
Redeploy the project so the new environment variable is applied.
The API key is used by the Vercel Functions and is not included in the frontend JavaScript code.


---
