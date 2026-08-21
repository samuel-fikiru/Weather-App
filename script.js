const formContainer = document.querySelector(".js-form-container");
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

let countrySelectionContainer = null;
let locationName = "";

// getWeatherBtn click listener 
formContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  clearInterface();
  renderLoadingMsg();
  const inputData = inputBar.value.trim();
  if (inputData !== "") {
    getLanLon(inputData);
    console.log('running');
  } else {
    renderErrorMsg("location");
  }
});


// adds input eventlistener on inputBAr
function inputEventLisener() {
  inputBar.addEventListener("input", () => {
    clearInterface();
  });
}

// clears result , state interface
function clearInterface() {
  if (weatherBoxContainer.contains(countrySelectionContainer)) {
    weatherBoxContainer.removeChild(countrySelectionContainer);
  }
  renderLoadingMsg();
  loadingMsg.style.display = "none";
}

// retrives lat and lon address of a location
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

      const BtnsContainer = document.querySelector(".countrySelectionContainer");
      BtnsContainer.addEventListener("click", (event) => {
        // adds event listener to the container instead of each btns
        if (event.target.classList.contains("countryCodeBtn")) {
          let selectedCountryCode = event.target.textContent;

          weatherBoxContainer.removeChild(countrySelectionContainer);
          renderLoadingMsg();

          const filteredCountry = data.filter((c) => c.country === selectedCountryCode)[0];
          assignInfo(filteredCountry);
        }
      });
    } else {
      if (data.length === 0) {
        renderErrorMsg("location");
      } else {
        assignInfo(data[0]);
      }
    }
  } catch (error) {
    if (error.message === "Request failed") {
      renderErrorMsg("request");
    } else {
      renderErrorMsg("location");
    }
  }
  inputEventLisener();
}

// assings lat, lon and placename fromm selected country data
function assignInfo(data) {
  locationName = data.name;
  const lat = data.lat;
  const lon = data.lon;
  getWeatherData(lat, lon);
}

const countryCodeText = document.querySelector(".code-preferance-text"); // choose country code paragraph

// creates country code options on multiple result
function handleCountryCode(data) {
  const container = document.createElement("div");
  container.className = "countrySelectionContainer";
  data.forEach((res) => {
    const countryCodeBtn = document.createElement("button");
    countryCodeBtn.className = "countryCodeBtn";
    countryCodeBtn.textContent = res.country;
    container.appendChild(countryCodeBtn);
  });
  loadingMsg.style.display = "none";
  countryCodeText.style.display = "block";
  weatherBoxContainer.appendChild(container);

  countrySelectionContainer = container;
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
      renderLoadingMsg();
      render(data);
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

// handles displaying loading message
function renderLoadingMsg() {
  loadingMsg.style.display = "block";
  countryCodeText.style.display = "none";
  weatherStatContainer.style.display = "none";
  errorMsg.style.display = "none";
}

// renders weather stat data
function render(data) {
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const weather = data.weather[0].description;
  const countryCode = data.sys.country;

  errorMsg.style.display = "none";
  loadingMsg.style.display = "none";

  placeName.textContent = locationName;
  weatherData.textContent = weather;
  tempData.textContent = `Temperature : ${temp}°C`;
  humidityData.textContent = `Humidity : ${humidity}%`;
  countryCodeData.textContent = `Country Code: ${countryCode}`;
  weatherStatContainer.style.display = "block";
  inputBar.value = "";
}
