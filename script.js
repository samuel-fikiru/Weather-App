const getWeatherBtn = document.querySelector(".js-btn");
const inputBar = document.querySelector(".js-input-bar");

const placeName=document.querySelector('.js-place-name');
const weatherData=document.querySelector('.js-weather-stat');
const tempData=document.querySelector('.js-temp');
const humidityData=document.querySelector('.js-humidity');

let temp='';
let humidity='';
let weather = '';

getWeatherBtn.addEventListener("click", (e) => {
  const inputData = inputBar.value
  getLanLong(inputData);

});



async function getLanLong(place){
  const locationName = place;
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=5&appid=9667085e726259341ed94d4ecf653338`);
  const data = await response.json();

  let lat=0;
  let lon=0;
  for (let i=0; i<data.length; i++){
    if (data[i].name === locationName){
      lat = data[i].lat;
      lon = data[i].lon;
    }
  }

  getWeatherData(lat, lon);

}


async function getWeatherData(latitude, longitude){
  const lat=latitude;
  const lon=longitude;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9667085e726259341ed94d4ecf653338`);
  const data = await response.json();

  temp=data.main.temp;
  humidity=data.main.humidity;
  weather=data.weather[0].main;
  render();
}

function render(){
  const deg='&deg';
  placeName.innerHTML=inputBar.value;
  weatherData.innerHTML=weather;
  tempData.innerHTML=`Temperature : ${temp}${deg}C`;
  humidityData.innerHTML=`Humidity : ${humidity}%`;
}

/*
weather
https://api.openweathermap.org/data/2.5/weather?lat=6.860253&lon=37.759609&appid=9667085e726259341ed94d4ecf653338
geo
http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=9667085e726259341ed94d4ecf653338
*/


