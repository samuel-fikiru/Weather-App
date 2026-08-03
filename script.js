const getWeatherBtn = document.querySelector('.js-btn');
const inputBar = document.querySelector('.js-input-bar');

getWeatherBtn.addEventListener('click', (e)=>{
    console.log(inputBar.value);
})