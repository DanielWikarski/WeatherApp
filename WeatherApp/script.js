const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const APIKEY = "bf52e8f3ee09cd6800fcdafde16155a5";
const body = document.querySelector("body");
const getWeatherData = () => {
  const getGeoCoordinates = () => {
    const geocodingAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=${APIKEY}`;
    fetch(geocodingAPI)
      .then((response) => response.json())
      .then((data) => {
        /* Recieving Coordinates of City by GEO-CODE */
        let lat = data[0].lat;
        let lon = data[0].lon;
        getWeather(lat, lon);
        warning.textContent = "";
      })
      .catch((error) => {
        console.error("Error: City name misspeled or bad request");
        warning.textContent = "Hmmm, something went wrong...";
      });
  };
  getGeoCoordinates();
  const getWeather = (lat, lon) => {
    const geoDataAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
    fetch(geoDataAPI)
      .then((response) => response.json())
      .then((data) => {
        cityName.classList.add("slideIn");
        setTimeout(() => {
          cityName.classList.remove("slideIn");
        }, 500);
        /* TEST */
        let temperatureData = data.main.temp;
        let humidityData = data.main.humidity;
        let weatherData = data.weather[0].main;
        temperature.textContent = Math.round(temperatureData - 273.15) + "°C";
        humidity.textContent = humidityData + "%";
        weather.textContent = weatherData;
        cityName.textContent = input.value;
        photo.style.display = "block";
        if (weatherData === "Clouds") {
          photo.setAttribute("src", "./img/cloud.png");
        } else if (weatherData === "Drizzle") {
          photo.setAttribute("src", "./img/drizzle.png");
        } else if (weatherData === "Clear") {
          photo.setAttribute("src", "./img/sun.png");
        } else if (weatherData === "Fog" || weatherData === "Mist") {
          photo.setAttribute("src", "./img/fog.png");
        } else if (weatherData === "Rain") {
          photo.setAttribute("src", "./img/rain.png");
        } else if (weatherData === "Thunderstorm") {
          photo.setAttribute("src", "./img/thunderstorm.png");
        } else {
          photo.setAttribute("src", "./img/unknown.png");
        }
      });
  };
};

button.addEventListener("click", () => {
  getWeatherData();
});

const enterCheck = (e) => {
  if (e.key === "Enter") {
    getWeatherData();
  }
};
input.addEventListener("keyup", enterCheck);

const loadInfo = () => {
  console.log("JavaScript file has loaded");
};

loadInfo();
