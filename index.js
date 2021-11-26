function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { addDays } from "date-fns";
var icons = {
  Clear: "https://img.icons8.com/external-justicon-lineal-color-justicon/128/000000/external-sunny-weather-justicon-lineal-color-justicon.png",
  Snowing: "https://img.icons8.com/color/128/000000/snow--v1.png",
  Drizzle: "https://img.icons8.com/external-tulpahn-outline-color-tulpahn/128/000000/external-drizzle-weather-tulpahn-outline-color-tulpahn.png",
  Rain: "https://img.icons8.com/external-tulpahn-outline-color-tulpahn/128/000000/external-rain-autumn-tulpahn-outline-color-tulpahn.png",
  Clouds: "https://img.icons8.com/external-justicon-lineal-color-justicon/128/000000/external-cloudy-weather-justicon-lineal-color-justicon-1.png",
  Mist: "https://img.icons8.com/dusk/128/000000/foggy-night-1.png",
  Default: "https://img.icons8.com/fluency/120/000000/globe.png"
};
var todayDate = new Date();
var today = document.querySelector("#today");
var todayInfo = document.querySelector("#today-weather-text");
var fahrenheit = document.querySelector("#fahrenheit");
var celsius = document.querySelector("#celsius");
var button = document.querySelector("#search-button"); //default settings for the page

(function () {
  fahrenheit.classList.add("selected");
  fahrenheit.addEventListener("click", toggleSelected);
  celsius.addEventListener("click", toggleSelected);
  document.addEventListener("keypress", function (e) {
    if (e.code == "Enter") submitForm();
  });
  button.addEventListener("click", submitForm);
  getData("New York").then(function (response) {
    return parseData(response);
  });
})();

function toggleSelected(e) {
  var clicked = e.target.getAttribute("id");
  var selected = document.querySelector(".selected");

  if (selected.getAttribute("id") != clicked) {
    fahrenheit.classList.toggle("selected");
    celsius.classList.toggle("selected");
  }
} //gets user input and submits it


function submitForm() {
  return _submitForm.apply(this, arguments);
} //uses weather API to get data and return it


function _submitForm() {
  _submitForm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var searchbar, input, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            searchbar = document.querySelector("#search-bar");
            input = searchbar.value;

            if (!(input != "")) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return getData(input);

          case 5:
            response = _context.sent;

            //query doesnt work
            if (response === false) {
              alert("City name was not valid, try again");
            } //query works
            else {
              parseData(response);
            }

          case 7:
            //clear searchbar
            searchbar.value = "";

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _submitForm.apply(this, arguments);
}

function getData(_x) {
  return _getData.apply(this, arguments);
} //goes through data and parses/cleans it up to be rendered


function _getData() {
  _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(city) {
    var selected, response, fetchData, info, type, coord, todayData, upcomingData, returnData;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            selected = document.querySelector(".selected").getAttribute("id"); //first api request for today data

            _context2.next = 4;
            return fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&units=").concat(selected == "fahrenheit" ? "imperial" : "metric", "&appid=99d2c5e24128552205c7bd4bdccb30b5"));

          case 4:
            response = _context2.sent;
            _context2.next = 7;
            return response.json();

          case 7:
            fetchData = _context2.sent;
            info = fetchData.main;
            type = fetchData.weather;
            coord = [fetchData.coord.lon, fetchData.coord.lat];
            todayData = {
              city: city,
              "feels-like": info.feels_like,
              humidity: info.humidity,
              "current-temp": info.temp,
              high: info.temp_max,
              low: info.temp_min,
              type: type[0].main,
              description: type[0].description
            }; //second api request for upcoming data

            _context2.next = 14;
            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=".concat(coord[1], "&lon=").concat(coord[0], "&exclude=current,minutely,hourly,alerts&units=").concat(selected == "fahrenheit" ? "imperial" : "metric", "&appid=99d2c5e24128552205c7bd4bdccb30b5"));

          case 14:
            response = _context2.sent;
            _context2.next = 17;
            return response.json();

          case 17:
            fetchData = _context2.sent;
            info = fetchData.daily;
            upcomingData = {
              dayZero: {
                highLow: info[0].temp,
                description: info[0].weather[0]
              },
              dayOne: {
                highLow: info[1].temp,
                description: info[1].weather[0]
              },
              dayTwo: {
                highLow: info[2].temp,
                description: info[2].weather[0]
              },
              dayThree: {
                highLow: info[3].temp,
                description: info[3].weather[0]
              },
              dayFour: {
                highLow: info[4].temp,
                description: info[4].weather[0]
              },
              dayFive: {
                highLow: info[5].temp,
                description: info[5].weather[0]
              }
            };
            returnData = [todayData, upcomingData];
            return _context2.abrupt("return", returnData);

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", false);

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 24]]);
  }));
  return _getData.apply(this, arguments);
}

function parseData(data) {
  //data for today
  var cityName = data[0].city.toLowerCase().split(" ").map(function (str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }).join(" ");
  var feelsLike = Math.floor(data[0]["feels-like"]);
  var humidity = data[0].humidity;
  var currentTemp = Math.floor(data[0]["current-temp"]);
  var high = Math.floor(data[0].high);
  var low = Math.floor(data[0].low);
  var type = data[0].type;
  var description = data[0].description;
  var image = "";
  var background = ""; //image array for upcoming

  var upcomingImages = []; //image is the icon for today

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

  var returnTodayData = {
    cityName: cityName,
    feelsLike: feelsLike,
    humidity: humidity,
    currentTemp: currentTemp,
    high: high,
    low: low,
    description: description,
    image: image,
    background: background
  };
  var returnUpcomingData = {
    "day-one": [Math.floor(data[1].dayZero.highLow.max), Math.floor(data[1].dayZero.highLow.min), data[1].dayZero.description.main],
    "day-two": [Math.floor(data[1].dayOne.highLow.max), Math.floor(data[1].dayOne.highLow.min), data[1].dayOne.description.main],
    "day-three": [Math.floor(data[1].dayTwo.highLow.max), Math.floor(data[1].dayTwo.highLow.min), data[1].dayTwo.description.main],
    "day-four": [Math.floor(data[1].dayThree.highLow.max), Math.floor(data[1].dayThree.highLow.min), data[1].dayThree.description.main],
    "day-five": [Math.floor(data[1].dayFour.highLow.max), Math.floor(data[1].dayFour.highLow.min), data[1].dayFour.description.main],
    "day-six": [Math.floor(data[1].dayFive.highLow.max), Math.floor(data[1].dayFive.highLow.min), data[1].dayFive.description.main]
  };
  renderData(returnTodayData, "today");
  renderData(returnUpcomingData, "upcoming"); //console.log(Object.keys(returnUpcomingData));
} //displays data on site


function renderData(data, options) {
  var selected = document.querySelector(".selected").getAttribute("id");
  var root = document.documentElement;
  var cityName = today.querySelector(".name");
  var todayImage = today.querySelector(".today-weather-type");
  var todayTemp = todayInfo.querySelector(".current-temp");
  var todayFeelsLike = todayInfo.querySelector(".feels-like");
  var todayHumidity = todayInfo.querySelector(".humidity");
  var todayHighLow = todayInfo.querySelector(".high-low");
  var todayType = todayInfo.querySelector(".type");
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
    todayTemp.textContent = "".concat(data.currentTemp, "\xB0").concat(selected == "fahrenheit" ? "F" : "C");
    todayFeelsLike.textContent = "Feels like: ".concat(data.feelsLike, "\xB0").concat(selected == "fahrenheit" ? "F" : "C");
    todayHumidity.textContent = "Humidity: ".concat(data.humidity, "%");
    todayHighLow.textContent = "".concat(data.high, "\xB0 / ").concat(data.low, "\xB0");
    todayType.textContent = data.description;
    root.style.setProperty("--bg", "url(\"".concat(data.background, "\")"));
  } else if (options == "upcoming") {
    for (var _i = 0, _Object$keys = Object.keys(data); _i < _Object$keys.length; _i++) {
      key = _Object$keys[_i];
      var upcoming = document.querySelector("#".concat(key));
      var highLow = upcoming.querySelector(".high-low");
      var type = upcoming.querySelector(".type");
      var date = upcoming.querySelector(".date");
      date.textContent = addDays(todayDate, 1);
      highLow.textContent = "".concat(data[key][0], "\xB0 / ").concat(data[key][1], "\xB0");
      type.textContent = data[key][2];
    }
  }
}