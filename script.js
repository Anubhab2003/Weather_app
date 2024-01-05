const cityForm = document.getElementById('city-form');
const cityNameInput = document.getElementById('city-name');
const weatherInfo = document.getElementById('weather-info');

cityForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const cityName = cityNameInput.value.trim();

  if (!cityName) {
    alert('Please enter a city name');
    return;
  }

  // Use the correct API endpoint for OpenWeatherMap
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b0189432e17679f079b50b37f03dc2fe`)
    .then(response => response.json())
    .then(data => {
      // Adjust data access back to OpenWeatherMap's response structure
      const weatherIcon = document.getElementById('weather-icon');
      const cityNameDisplay = document.getElementById('city-name-display');
      const temperatureDisplay = document.getElementById('temperature-display');
      const feelsLikeDisplay = document.getElementById('feels-like-display');
      const weatherDescriptionDisplay = document.getElementById('weather-description-display');

      weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      cityNameDisplay.textContent = `Weather in ${data.name}`;
      temperatureDisplay.textContent = `Current temperature: ${Math.round(data.main.temp - 273.15)}°C`;
      feelsLikeDisplay.textContent = `Feels like: ${Math.round(data.main.feels_like - 273.15)}°C`;
      weatherDescriptionDisplay.textContent = `Weather condition: ${data.weather[0].description}`;
      weatherInfo.style.display = 'block';
    })
    .catch(error => {
      console.error(error);
      weatherInfo.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
      weatherInfo.style.display = 'block';
    });
});
