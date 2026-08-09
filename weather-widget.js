async function getUserCoordinates(accountFallbackLocation) {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ query: accountFallbackLocation, source: 'Account Fallback (No Geo Support)' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          source: 'Live GPS'
        });
      },
      (error) => {
        console.warn('Geolocation denied or failed. Falling back to account location.', error);
        resolve({ query: accountFallbackLocation, source: 'Account Profile' });
      },
      { timeout: 7000, enableHighAccuracy: true }
    );
  });
}

async function initWeatherWidget(userProfileLocation = 'New York, NY') {
  const locationData = await getUserCoordinates(userProfileLocation);
  
  // Construct API endpoint based on available location source
  let apiParams = locationData.lat 
    ? `lat=${locationData.lat}&lon=${locationData.lon}` 
    : `q=${encodeURIComponent(locationData.query)}`;

  console.log(`Fetching weather data using [${locationData.source}]: ${apiParams}`);

  // Replace YOUR_API_KEY with your OpenWeatherMap or target API key
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?${apiParams}&units=imperial&appid=YOUR_API_KEY`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Weather network request failed');
    const data = await response.json();
    
    renderWeatherWidget(data, locationData.source);
  } catch (err) {
    console.error('Failed to load weather widget:', err);
  }
}

function renderWeatherWidget(data, source) {
  const container = document.getElementById('weather-widget-container');
  if (!container) return;

  container.innerHTML = `
    <div class="weather-card">
      <div class="weather-header">
        <span>${data.name}</span>
        <span class="location-badge">${source}</span>
      </div>
      <div class="main-temp-block">
        <div class="temp-display">${Math.round(data.main.temp)}°</div>
        <div class="condition-desc">${data.weather[0].main}</div>
      </div>
      <div class="metrics-grid">
        <div class="metric-pill">
          <span class="metric-label">Feels Like</span>
          <div class="metric-value">${Math.round(data.main.feels_like)}°</div>
        </div>
        <div class="metric-pill">
          <span class="metric-label">Humidity</span>
          <div class="metric-value">${data.main.humidity}%</div>
        </div>
        <div class="metric-pill">
          <span class="metric-label">Wind</span>
          <div class="metric-value">${Math.round(data.wind.speed)} mph</div>
        </div>
      </div>
    </div>
  `;
}
