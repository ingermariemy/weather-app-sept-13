function formatDate(Today) {
  let h2 = document.querySelector("h2");
  let h3 = document.querySelector("h3");

  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }

  h2.innerHTML = `${day} ${date} ${month} ${year}`;
  h3.innerHTML = `${hours} : ${minutes}`;
}

//forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row"`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
         <div class="weather-forecast-date">${day}</div>
         <img 
         src="https://openweathermap.org/img/wn/03d@2x.png" 
         width="40" 
         alt="clouded" 
         id="weatherIcon">
     <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-high">
               21°
               </span>
            <span class="weather-forecast-temperature-low">
                |17°
               </span>
          </div>
     </div>
     
     `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Fahrenheit conversion
function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheit);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheit = document.querySelector("#currentF");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#currentC");
celsius.addEventListener("click", displayCelsius);

let celsiusTemperature = null;

//Search event - displays the temperature in the city you are searching for//

function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#searchBar-text");
  let h1 = document.querySelector("#searchCity");
  h1.innerHTML = `${searchInput.value}`;

  let apiKey = "126b4c3109648af60d931bdfb6f221d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=126b4c3109648af60d931bdfb6f221d1`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

formatDate();

let apiKey = "126b4c3109648af60d931bdfb6f221d1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Oslo&units=metric&appid=126b4c3109648af60d931bdfb6f221d1`;
let city = "response.data.name";

function showTemp(response) {
  let h1 = document.querySelector("#searchCity");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  let effectiveTemp = Math.round(response.data.main.feels_like);
  let effectiveElement = document.querySelector("#E-temp");

  celsiusTemperature = response.data.main.temp;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity-prec");
  let windspeed = response.data.wind.speed;
  let windspeedElement = document.querySelector("#wind-speed");
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#weatherIcon");

  temperatureElement.innerHTML = `${temperature}°`;
  effectiveElement.innerHTML = `${effectiveTemp}°`;
  humidityElement.innerHTML = `${humidity}`;
  windspeedElement.innerHTML = `${windspeed}`;
  descriptionElement.innerHTML = `${description}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);

//My position and displaying current temp in my position//

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "126b4c3109648af60d931bdfb6f221d1";
  let apiLocUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiLocUrl}&appid=${apiKey}`).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

getCurrentPosition();

displayForecast();
