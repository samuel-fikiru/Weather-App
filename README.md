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

This project utilizes the OpenWeatherMap API. To run the application with your own API key, follow these steps:

1. **Create an account** at [OpenWeatherMap](https://openweathermap.org/api) and obtain your API key.

2. **Configure environment variables in Vercel:**
   - Navigate to your project’s **Settings** → **Environment Variables**.
   - Add a new variable:
     ```
     OPENWEATHER_API_KEY=your_api_key_here
     ```
   - Ensure the variable is enabled for the appropriate environment (e.g., Production, Preview).

3. **Redeploy** your project to apply the new environment variable.

> **Note:** The API key is securely used by Vercel Functions and **not** embedded directly in the frontend JavaScript code.

---
