const getWeatherBtn = document.querySelector(".js-btn");
const inputBar = document.querySelector(".js-input-bar");

const placeName = document.querySelector(".js-place-name");
const weatherData = document.querySelector(".js-weather-stat");
const tempData = document.querySelector(".js-temp");
const humidityData = document.querySelector(".js-humidity");
const errorMsg = document.querySelector(".error-mesg");
const loadingMsg = document.querySelector(".js-loading-mesg");

const weatherStatContainer = document.querySelector('.js-weather-stat-container');



let temp = "";
let humidity = "";
let weather = "";

loadingMsg.style.display='none';
getWeatherBtn.addEventListener("click", (e) => {
  weatherStatContainer.style.display='none';
  loadingMsg.style.display='block';
  const inputData = inputBar.value;
  getLanLong(inputData);
});

async function getLanLong(place) {
  const locationName = place;
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=5&appid=9667085e726259341ed94d4ecf653338`);
    const data = await response.json();

    let lat = data[0].lat;
    let lon = data[0].lon;
    getWeatherData(lat, lon);
  } catch (error) {
    errorMsg.style.display = "block";
    errorMsg.innerHTML = `
    Invalid Location,<br> <span class="request-text">please type valid location</span> </
    `;
  }
}

async function getWeatherData(latitude, longitude) {
  const lat = latitude;
  const lon = longitude;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9667085e726259341ed94d4ecf653338`);
  const data = await response.json();

  temp = data.main.temp;
  humidity = data.main.humidity;
  weather = data.weather[0].description;
  render();
}

function render() {
  errorMsg.style.display = "none";
  loadingMsg.style.display='none';
  

  const deg = "&deg";
  placeName.innerHTML = inputBar.value;
  weatherData.innerHTML = weather;
  tempData.innerHTML = `Temperature : ${temp + deg}C`;
  humidityData.innerHTML = `Humidity : ${humidity}%`;
  weatherStatContainer.style.display='block';
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
