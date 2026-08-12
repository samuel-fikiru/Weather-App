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
  const inputData = inputBar.value;
  getLanLon(inputData);
});

inputBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    InputDisplayControl();
    const inputData = inputBar.value;
    getLanLon(inputData);
  }
});

function InputDisplayControl() {
  weatherStatContainer.style.display = "none";
  errorMsg.style.display = "none";
  loadingMsg.style.display = "block";
}

async function getLanLon(place) {
  const locationName = place;
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=5&appid=9667085e726259341ed94d4ecf653338`);
    const data = await response.json();

    if (data.length > 1) {
      chosenCountry = handleCountryCode(data);

      const btnContainer = document.querySelectorAll(".countryCodeBtn");
      btnContainer.forEach((btn) => {
        btn.addEventListener("click", () => {
          // console.log(btn.textContent);
          let countryCodeChoice = btn.textContent;

          weatherBoxContainer.removeChild(countryOptionContainer);
          loadingMsg.style.display = "block";
          countryCodeText.style.display = "none";

          data.forEach((d) => {
            if (d.country === countryCodeChoice) {
              let lat = d.lat;
              let lon = d.lon;
              getWeatherData(lat, lon);
            }
          });
        });
      });
    } else {
      let lat = data[0].lat;
      let lon = data[0].lon;
      getWeatherData(lat, lon);
    }
  } catch (error) {
    errorMsg.style.display = "block";
    loadingMsg.style.display = "none";
    errorMsg.innerHTML = `
    Invalid Location,<br> <span class="request-text">please type valid location</span> </
    `;
  }
}

const countryCodeText = document.querySelector(".country-code-option");

function handleCountryCode(data) {
  const container = document.createElement("div");
  container.className = "Country-options-container";
  data.forEach((res) => {
    // console.log(res.country);
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

async function getWeatherData(latitude, longitude) {
  const lat = latitude;
  const lon = longitude;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9667085e726259341ed94d4ecf653338`);
  const data = await response.json();

  temp = data.main.temp;
  humidity = data.main.humidity;
  weather = data.weather[0].description;
  locationName = data.name;
  countryCode = data.sys.country;
  render();
}

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

/*
const test = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=hggchgf&limit=5&appid=9667085e726259341ed94d4ecf653338`)
  .then((response) => {
    response.json();
  })
  .then((data) => {
    console.log(data.main);
  })
  .catch((error) => {
    console.log("Not Working");
  });

  */
