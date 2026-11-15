const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=-34.6037&longitude=-58.3816&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=America%2FArgentina%2FBuenos_Aires";
const membersUrl = "data/members.json";

const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecast = document.querySelector("#forecast");
const spotlightList = document.querySelector("#spotlight-list");

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Freezing drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Light rain showers",
  81: "Rain showers",
  82: "Heavy rain showers",
  85: "Light snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail"
};

const spotlightLevels = {
  2: "Silver",
  3: "Gold"
};

function describeWeather(code) {
  return weatherDescriptions[code] || "Conditions unavailable";
}

function formatTemperature(value) {
  return `${Math.round(value)}°C`;
}

function formatForecastDate(isoDate) {
  const date = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(date);
}

function displayWeather(data) {
  const description = describeWeather(data.current.weather_code);
  currentTemp.textContent = formatTemperature(data.current.temperature_2m);
  weatherDesc.textContent = description;

  forecast.innerHTML = "";
  data.daily.time.forEach((isoDate, index) => {
    const day = document.createElement("article");
    day.classList.add("forecast-day");
    day.innerHTML = `
      <h3>${formatForecastDate(isoDate)}</h3>
      <p class="forecast-temp">${formatTemperature(data.daily.temperature_2m_max[index])}</p>
      <p>${describeWeather(data.daily.weather_code[index])}</p>
      <p class="forecast-low">Low ${formatTemperature(data.daily.temperature_2m_min[index])}</p>
    `;
    forecast.appendChild(day);
  });
}

async function getWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) {
      throw new Error(`Unable to load weather (${response.status})`);
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    currentTemp.textContent = "Weather unavailable";
    weatherDesc.textContent = error.message;
  }
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function displaySpotlights(members) {
  const qualified = members.filter((member) => member.membershipLevel in spotlightLevels);
  const count = Math.min(qualified.length, 2 + Math.floor(Math.random() * 2));
  const selected = shuffle(qualified).slice(0, count);

  spotlightList.innerHTML = "";
  selected.forEach((member) => {
    const websiteLabel = member.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const card = document.createElement("article");
    card.classList.add("member-card", "spotlight");
    card.innerHTML = `
      <h3>${member.name}</h3>
      <p class="tagline">${member.tagline}</p>
      <p class="membership">${spotlightLevels[member.membershipLevel]} Member</p>
      <div class="member-body">
        <img src="${member.image}" alt="${member.name} logo" width="88" height="88" loading="lazy">
        <div class="member-meta">
          <p><strong>PHONE:</strong> <a href="tel:${member.phone.replace(/[^\d+]/g, "")}">${member.phone}</a></p>
          <p><strong>ADDRESS:</strong> ${member.address}</p>
          <p><strong>URL:</strong> <a href="${member.url}" target="_blank" rel="noopener noreferrer">${websiteLabel}</a></p>
        </div>
      </div>
    `;
    spotlightList.appendChild(card);
  });
}

async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) {
      throw new Error(`Unable to load members (${response.status})`);
    }
    const members = await response.json();
    displaySpotlights(members);
  } catch (error) {
    spotlightList.innerHTML = `<p>Member spotlights could not be loaded. ${error.message}</p>`;
  }
}

getWeather();
getSpotlights();
