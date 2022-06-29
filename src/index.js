const nameDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function showWether(response) {

let temperatureAPI = response.data.main.temp;
let humidity = response.data.main.humidity;
let stateWeatherValue = response.data.weather[0].description;
let windSpeed = response.data.wind.speed;
let name = response.data.name;

let objWeather = {};
    objWeather.temperature = temperatureAPI;
    objWeather.stateWeatherValue = stateWeatherValue;
    objWeather.humidity = humidity;
    objWeather.windSpeed = windSpeed;
    objWeather.name = name;
     
return objWeather;
}

function getDataForWeather (city){
  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=302194042e30cf68ae215cbabca7559f&units=metric`;
  return axios.get(urlWeather).then(showWether); 
}

function editDataWeather(some) {
  let temperature = document.querySelector(".temperature");
  let stateWeather = document.querySelector("#state-weather");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let h1 = document.querySelector("h1");

 h1.innerHTML = some.name;
 temperature.innerHTML = Math.round(some.temperature);
 stateWeather.innerHTML = some.stateWeatherValue;
 humidity.innerHTML = some.humidity+"%";
 windSpeed.innerHTML = some.windSpeed+" km/h";
}

function updateTime() {

  let date = document.querySelector("#date-today");
  let now = new Date();
  let minutes;
  if(now.getMinutes()<10){
    minutes = "0"+now.getMinutes();
  } else {
    minutes = now.getMinutes();
  }
  date.innerHTML = nameDay[now.getDay()] + " " + now.getHours() + ":" + minutes;
}

function dataUpdate(event) {
  event.preventDefault();
  let inputSearchCity = document.querySelector("#search-input");
  let weatherResponse = getDataForWeather(inputSearchCity.value);
  weatherResponse.then(
  function(value) {editDataWeather(value);},
  function(error) {editDataWeather(error);}
);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", dataUpdate);

function showPosition(position){  
let lat = position.coords.latitude;
let lon = position.coords.longitude;

let urlCoord = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=302194042e30cf68ae215cbabca7559f&units=metric`;
let weatherResponseCoord = axios.get(urlCoord).then(showWether);

weatherResponseCoord.then(
  function(value) {editDataWeather(value);},
  function(error) {editDataWeather(error);}
);
}

function fahrenheit(event) {
  event.preventDefault();
  let temperatureValue = document.getElementById("temperature").innerHTML;
  let temperature = document.getElementById("temperature");
  let fahrenheit = (temperatureValue * 9) / 5 + 32;
  temperature.innerHTML = fahrenheit;
  valueTemp.classList.add("not-active");
  valueTempC.classList.remove("not-active");
}

let valueTemp = document.querySelector("#f");
valueTemp.addEventListener("click", fahrenheit);

function celc(event) {
  event.preventDefault();
  let temperatureValue = document.getElementById("temperature").innerHTML;
  let temperature = document.getElementById("temperature");
  let celc = (temperatureValue - 32) / 1.8;
  temperature.innerHTML = Math.round(celc);
  valueTempC.classList.add("not-active");
  valueTemp.classList.remove("not-active");
}

function dataUpdateCoord(){
navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", dataUpdateCoord);

let valueTempC = document.querySelector("#c");
valueTempC.addEventListener("click", celc);

navigator.geolocation.getCurrentPosition(showPosition);
updateTime();