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

//default settings for the page
(function() {
  fahrenheit.classList.add("selected");
  fahrenheit.addEventListener("click", toggleSelected);
  celsius.addEventListener("click", toggleSelected);
  document.addEventListener("keypress", (e) => {
    if (e.code == "Enter") submitForm();
  });
  button.addEventListener("click", submitForm);

  getData("New York").then((response)=>parseData(response));
})();

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

    //first api request for today data
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${
        selected == "fahrenheit" ? "imperial" : "metric"
      }&appid=99d2c5e24128552205c7bd4bdccb30b5`
    );
    let fetchData = await response.json();
    let info = fetchData.main;
    let type = fetchData.weather;
    let coord = [fetchData.coord.lon, fetchData.coord.lat];

    let todayData = {
      city,
      "feels-like": info.feels_like,
      humidity: info.humidity,
      "current-temp": info.temp,
      high: info.temp_max,
      low: info.temp_min,
      type: type[0].main,
      description: type[0].description,
    };

    //second api request for upcoming data
    response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coord[1]}&lon=${
        coord[0]
      }&exclude=current,minutely,hourly,alerts&units=${
        selected == "fahrenheit" ? "imperial" : "metric"
      }&appid=99d2c5e24128552205c7bd4bdccb30b5`
    );
    fetchData = await response.json();
    info = fetchData.daily;

    let upcomingData = {
      dayZero: { highLow: info[0].temp, description: info[0].weather[0] },
      dayOne: { highLow: info[1].temp, description: info[1].weather[0] },
      dayTwo: { highLow: info[2].temp, description: info[2].weather[0] },
      dayThree: { highLow: info[3].temp, description: info[3].weather[0] },
      dayFour: { highLow: info[4].temp, description: info[4].weather[0] },
      dayFive: { highLow: info[5].temp, description: info[5].weather[0] },
    };

    let returnData = [todayData, upcomingData];
    return returnData;
  } catch (err) {
    console.log(err);
    return false;
  }
}

//goes through data and parses/cleans it up to be rendered
function parseData(data) {
  //data for today
  let cityName = data[0].city
    .toLowerCase()
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
    .join(" ");
  let feelsLike = Math.floor(data[0]["feels-like"]);
  let humidity = data[0].humidity;
  let currentTemp = Math.floor(data[0]["current-temp"]);
  let high = Math.floor(data[0].high);
  let low = Math.floor(data[0].low);
  let type = data[0].type;
  let description = data[0].description;
  let image = "";
  let background = "";

  //image array for upcoming
  let upcomingImages = [];

  //image is the icon for today
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
    case "Snow":
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

  let returnUpcomingData = {
    "day-one": [
      Math.floor(data[1].dayZero.highLow.max),
      Math.floor(data[1].dayZero.highLow.min),
      data[1].dayZero.description.main,
    ],
    "day-two": [
      Math.floor(data[1].dayOne.highLow.max),
      Math.floor(data[1].dayOne.highLow.min),
      data[1].dayOne.description.main,
    ],
    "day-three": [
      Math.floor(data[1].dayTwo.highLow.max),
      Math.floor(data[1].dayTwo.highLow.min),
      data[1].dayTwo.description.main,
    ],
    "day-four": [
      Math.floor(data[1].dayThree.highLow.max),
      Math.floor(data[1].dayThree.highLow.min),
      data[1].dayThree.description.main,
    ],
    "day-five": [
      Math.floor(data[1].dayFour.highLow.max),
      Math.floor(data[1].dayFour.highLow.min),
      data[1].dayFour.description.main,
    ],
    "day-six": [
      Math.floor(data[1].dayFive.highLow.max),
      Math.floor(data[1].dayFive.highLow.min),
      data[1].dayFive.description.main,
    ],
  };

  renderData(returnTodayData, "today");
  renderData(returnUpcomingData, "upcoming");

  //console.log(Object.keys(returnUpcomingData));
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

  /*   const upcoming = document.querySelector(".upcoming");

  const dayOne = document.querySelector("#day-one");
  const dayTwo = document.querySelector("#day-two");
  const dayThree = document.querySelector("#day-three");
  const dayFour = document.querySelector("#day-four");
  const dayFive = document.querySelector("#day-five");
  const daySix = document.querySelector("#day-six"); */

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
    for (key of Object.keys(data)) {
      let upcoming = document.querySelector(`#${key}`);
      let highLow = upcoming.querySelector(".high-low");
      let type = upcoming.querySelector(".type");
      highLow.textContent = `${data[key][0]}° / ${data[key][1]}°`;
      type.textContent = data[key][2];
    }
  }
}
