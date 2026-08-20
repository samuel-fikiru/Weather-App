const getWeatherBtn = document.querySelector(".js-btn");
const inputBar = document.querySelector(".js-input-bar");

const placeName = document.querySelector(".js-place-name");
const weatherData = document.querySelector(".js-weather-stat");
const tempData = document.querySelector(".js-temp");
const humidityData = document.querySelector(".js-humidity");
const countryCodeData = document.querySelector(".country-code");

const errorMsg = document.querySelector(".error-mesg");
const loadingMsg = document.querySelector(".js-loading-mesg");

const weatherBoxContainer = document.querySelector(".full-stat-container");
const weatherStatContainer = document.querySelector(".js-weather-stat-container");

let countryOptionContainer = null;

let temp = "";
let humidity = "";
let weather = "";
let locationName = "";
let countryCode = "";

loadingMsg.style.display = "none";

getWeatherBtn.addEventListener("click", (e) => {
  InputDisplayControl();
  const inputData = inputBar.value.trim();
  if (inputData !== "") {
    getLanLon(inputData);
  } else {
    renderErrorMsg("location");
  }
});

inputBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    InputDisplayControl();
    const inputData = inputBar.value.trim();
    if (inputData !== "") {
      getLanLon(inputData);
    } else {
      renderErrorMsg("location");
    }
  }
});

function InputDisplayControl() {
  weatherStatContainer.style.display = "none";
  errorMsg.style.display = "none";
  loadingMsg.style.display = "block";
}

let lat = 0;
let lon = 0;

async function getLanLon(placeName) {
  const locationinput = placeName;
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${locationinput}&limit=5&appid=9667085e726259341ed94d4ecf653338`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();

    if (data.length > 1) {
      handleCountryCode(data);

      const btnContainer = document.querySelectorAll(".countryCodeBtn");
      const BtnsContainer = document.querySelector(".country-options-container");
      BtnsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("countryCodeBtn")) {
          let countryCodeChoice = event.target.textContent;

          weatherBoxContainer.removeChild(countryOptionContainer);
          loadingMsg.style.display = "block";
          countryCodeText.style.display = "none";

          const filteredCountry = data.filter((c) => c.country === countryCodeChoice)[0];
          console.log(filteredCountry);
          assignInfo(filteredCountry);

          getWeatherData(lat, lon);
        }
      });
    } else {
      assignInfo(data[0]);

      getWeatherData(lat, lon);
    }
  } catch (error) {
    if (error.message === "Request failed") {
      renderErrorMsg("request");
    } else {
      renderErrorMsg("location");
    }
  }
}

function assignInfo(data) {
  locationName = data.name;
  lat = data.lat;
  lon = data.lon;
}

const countryCodeText = document.querySelector(".code-preferance-text"); // choose country code paragraph

// creates country code options on multiple result
function handleCountryCode(data) {
  const container = document.createElement("div");
  container.className = "country-options-container";
  data.forEach((res) => {
    const countryCodeBtn = document.createElement("button");
    countryCodeBtn.className = "countryCodeBtn";
    countryCodeBtn.innerHTML = res.country;
    container.appendChild(countryCodeBtn);
  });
  loadingMsg.style.display = "none";
  countryCodeText.style.display = "block";
  weatherBoxContainer.appendChild(container);

  countryOptionContainer = container;
}

// handles weather data request using lat and lon from getLanLon
async function getWeatherData(latitude, longitude) {
  const lat = latitude;
  const lon = longitude;

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9667085e726259341ed94d4ecf653338&units=metric`);
    if (!response.ok) {
      throw new Error("Request Failed!");
    } else {
      const data = await response.json();

      temp = data.main.temp;
      humidity = data.main.humidity;
      weather = data.weather[0].description;
      countryCode = data.sys.country;
      render();
    }
  } catch (error) {
    renderErrorMsg("request");
  }
}

// handles type of error msg to be displayed
function renderErrorMsg(errorType) {
  if (errorType === "location") {
    errorMsg.innerHTML = `
    Invalid Location,<br> <span class="request-text">please type valid location</span>`;
  } else if (errorType === "request") {
    errorMsg.innerHTML = `Request Failed,<br> <span class="request-text">please try again</span>`;
  }
  loadingMsg.style.display = "none";
  errorMsg.style.display = "block";
}

// renders weather stat data
function render() {
  errorMsg.style.display = "none";
  loadingMsg.style.display = "none";

  const deg = "&deg";

  placeName.innerHTML = locationName;
  weatherData.innerHTML = weather;
  tempData.innerHTML = `Temperature : ${temp + deg}C`;
  humidityData.innerHTML = `Humidity : ${humidity}%`;
  countryCodeData.innerHTML = `countryCode: ${countryCode}`;
  weatherStatContainer.style.display = "block";
  inputBar.value = "";
}
