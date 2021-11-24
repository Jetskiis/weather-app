const icons = {
  Clear:
    "https://img.icons8.com/external-justicon-lineal-color-justicon/128/000000/external-sunny-weather-justicon-lineal-color-justicon.png",
  Snowing: "https://img.icons8.com/color/128/000000/snow--v1.png",
  Drizzle:
    "https://img.icons8.com/external-tulpahn-outline-color-tulpahn/128/000000/external-drizzle-weather-tulpahn-outline-color-tulpahn.png",
  Rain: "https://img.icons8.com/external-tulpahn-outline-color-tulpahn/128/000000/external-rain-autumn-tulpahn-outline-color-tulpahn.png",
  Clouds:
    "https://img.icons8.com/external-justicon-lineal-color-justicon/128/000000/external-cloudy-weather-justicon-lineal-color-justicon-1.png",
  Mist: "https://img.icons8.com/dusk/128/000000/foggy-night-1.png",
  Default: "https://img.icons8.com/fluency/120/000000/globe.png",
};

const today = document.querySelector("#today");
const todayInfo = document.querySelector("#today-weather-text");

const fahrenheit = document.querySelector("#fahrenheit");
const celsius = document.querySelector("#celsius");
const button = document.querySelector("#search-button");

fahrenheit.classList.add("selected");
fahrenheit.addEventListener("click", toggleSelected);
celsius.addEventListener("click", toggleSelected);
document.addEventListener("keypress", (e) => {
  if (e.code == "Enter") submitForm();
});
button.addEventListener("click", submitForm);

function toggleSelected(e) {
  let clicked = e.target.getAttribute("id");
  let selected = document.querySelector(".selected");

  if (selected.getAttribute("id") != clicked) {
    fahrenheit.classList.toggle("selected");
    celsius.classList.toggle("selected");
  }
}

//gets user input and submits it
async function submitForm() {
  const searchbar = document.querySelector("#search-bar");
  let input = searchbar.value;

  if (input != "") {
    let response = await getData(input);
    //query doesnt work
    if (response === false) {
      alert("City name was not valid, try again");
    }
    //query works
    else {
      parseData(response);
    }
  }

  //clear searchbar
  searchbar.value = "";
}

//uses weather API to get data and return it
async function getData(city) {
  try {
    let selected = document.querySelector(".selected").getAttribute("id");
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${
        selected == "fahrenheit" ? "imperial" : "metric"
      }&appid=99d2c5e24128552205c7bd4bdccb30b5`
    );
    const fetchData = await response.json();
    const info = fetchData.main;
    const type = fetchData.weather;

    let returnData = {
      city,
      "feels-like": info.feels_like,
      humidity: info.humidity,
      "current-temp": info.temp,
      high: info.temp_max,
      low: info.temp_min,
      type: type[0].main,
      description: type[0].description,
    };

    return returnData;
  } catch (err) {
    return false;
  }
}

//goes through data and cleans it up
function parseData(data) {
  let cityName = data.city
    .toLowerCase()
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
    .join(" ");
  let feelsLike = Math.floor(data["feels-like"]);
  let humidity = data.humidity;
  let currentTemp = Math.floor(data["current-temp"]);
  let high = Math.floor(data.high);
  let low = Math.floor(data.low);
  let type = data.type;
  let description = data.description;
  let image = "";
  let background = "";

  switch (type) {
    case "Clear":
      image = icons.Clear;
      background = "./img/sunny.jpg";
      break;
    case "Clouds":
      image = icons.Clouds;
      background = "./img/cloudy.jpg";
      break;
    case "Rain":
      image = icons.Rain;
      background = "./img/rainy.jpg";
      break;
    case "Snowing":
      image = icons.Snowing;
      background = "./img/snowing.jpg";
      break;
    case "Drizzle":
      image = icons.Drizzle;
      background = "./img/drizzle.jpg";
      break;
    case "Fog":
      image = icons.Mist;
      background = "./img/mist.jpg";
      break;
    case "Mist":
      image = icons.Mist;
      background = "./img/mist.jpg";
      break;
    case "Haze":
      image = icons.Mist;
      background = "./img/mist.jpg";
      break;
    default:
      image = icons.Default;
      break;
  }

  let returnTodayData = {
    cityName,
    feelsLike,
    humidity,
    currentTemp,
    high,
    low,
    description,
    image,
    background,
  };

  let returnUpcomingData = {};

  renderData(returnTodayData, "today");

  //console.log(returnData);
}

//displays data on site
function renderData(data, options) {
  const selected = document.querySelector(".selected").getAttribute("id");

  const root = document.documentElement;
  const cityName = today.querySelector(".name");
  const todayImage = today.querySelector(".today-weather-type");
  const todayTemp = todayInfo.querySelector(".current-temp");
  const todayFeelsLike = todayInfo.querySelector(".feels-like");
  const todayHumidity = todayInfo.querySelector(".humidity");
  const todayHighLow = todayInfo.querySelector(".high-low");
  const todayType = todayInfo.querySelector(".type");

  const upcoming = document.querySelector(".upcoming");

  const dayOne = document.querySelector("#day-one");
  const dayTwo = document.querySelector("#day-two");
  const dayThree = document.querySelector("#day-three");
  const dayFour = document.querySelector("#day-four");
  const dayFive = document.querySelector("#day-five");
  const daySix = document.querySelector("#day-six");

  if (options == "today") {
    cityName.textContent = data.cityName;
    todayImage.src = data.image;
    todayTemp.textContent = `${data.currentTemp}°${
      selected == "fahrenheit" ? "F" : "C"
    }`;
    todayFeelsLike.textContent = `Feels like: ${data.feelsLike}°${
      selected == "fahrenheit" ? "F" : "C"
    }`;
    todayHumidity.textContent = `Humidity: ${data.humidity}%`;
    todayHighLow.textContent = `${data.high}° / ${data.low}°`;
    todayType.textContent = data.description;
    root.style.setProperty("--bg", `url("${data.background}")`);
  } else if (options == "upcoming") {
  }
}
