const today = document.querySelector("#today");
const todayInfo = document.querySelector("#today-weather-text");
const upcoming = document.querySelector(".upcoming");

const searchbar = document.querySelector("#search-bar");
const cityName = today.querySelector(".name");
const todayImage = today.querySelector(".today-weather-type");
const todayTemp = todayInfo.querySelector(".current-temp");
const todayFeelsLike = todayInfo.querySelector(".feels-like");
const todayHumidity = todayInfo.querySelector(".humidity");
const todayHighLow = todayInfo.querySelector(".high-low");
const todayType = todayInfo.querySelector(".type");

const dayOne = document.querySelector("#day-one");
const dayTwo = document.querySelector("#day-two");
const dayThree = document.querySelector("#day-three");
const dayFour = document.querySelector("#day-four");
const dayFive = document.querySelector("#day-five");
const daySix = document.querySelector("#day-six");

const images = {
  sunny:
    "https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-sunny-weather-justicon-lineal-color-justicon.png",
};
