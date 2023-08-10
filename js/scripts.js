const apiKey = "e89a92d4f5a4ca28a710282f8da03144";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

var modal = document.getElementById("myModal");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const dateElement = document.querySelector("#date");
const weekTimeElement = document.querySelector("#week");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const cloudsElement = document.querySelector("#clouds span");
const weatherContainer = document.querySelector("#weather-data");

const minElement = document.querySelector("#min-temperature");
const maxElement = document.querySelector("#max-temperature");

const loader = document.querySelector("#loader");

// Loader
const toggleLoader = () => {
  loader.classList.toggle("hide");
};

// Funções

const getWeatherData = async (city) => {
  toggleLoader();
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  toggleLoader();

  return data;
};

const showMeWeatherData = async (city) => {
  const data = await getWeatherData(city);

  let unixTimestampSunrise = data.sys.sunrise;
  let dateObjSunrise = new Date(unixTimestampSunrise * 1000);
  let utcStringSunrise = dateObjSunrise.toLocaleTimeString();

  let unixTimestampSunset = data.sys.sunset;
  let dateObjSunset = new Date(unixTimestampSunset * 1000);
  let utcStringSunset = dateObjSunset.toLocaleTimeString();

  const dayName = new Array(
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  );
  minElement.innerText = utcStringSunrise
  maxElement.innerText = utcStringSunset;
  humidityElement.innerText = `${data.main.humidity} %`;
  windElement.innerText = `${data.wind.speed} km/h`;
  cloudsElement.innerText = `${data.clouds.all} %`;
  cityElement.innerText = `${data.name}, ${data.sys.country}`;
  tempElement.innerText = parseInt(data.main.temp);
  dateElement.innerText = new Date().toLocaleDateString();
  weekTimeElement.innerText = `${
    dayName[new Date().getDay()]
  }, ${new Date().getHours()}:${new Date().getMinutes()}`;
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );




  weatherContainer.classList.remove("hide");
};

// Eventos

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;
  showMeWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value;
    showMeWeatherData(city);
  }
});

