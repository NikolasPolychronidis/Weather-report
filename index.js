async function getRandomImage() {
  try {
    const response = await fetch(
      'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
    );
    const data = await response.json();
    const imageUrl = data.urls.regular;
    const authorName = data.user.name;
    const authorElement = document.getElementById('author');
    authorElement.textContent = `Photo by ${authorName}`;
    document.body.style.backgroundImage = `url(${imageUrl})`;
  } catch (error) {
    console.error('Error fetching image:', error);
    document.body.style.backgroundImage =
      'url(https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
  }
}

async function fetchCoinData() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/dogecoin'
    ); // Replace with the actual API endpoint for fetching cryptocurrency data

    if (!response.ok) {
      throw new Error('Failed to fetch coin data');
    }

    const data = await response.json();

    const cryptoElement = document.getElementById('crypto-top');
    const crypto = document.getElementById('crypto');
    cryptoElement.innerHTML = `
            <img src="${data.image.small}" />
            <span>${data.name}</span>
            
          `;
    crypto.innerHTML += `
        <p>🎯: ${data.market_data.current_price.usd}</p>
        <p>👆: ${data.market_data.high_24h.usd}</p>
        <p>👇: ${data.market_data.low_24h.usd}</p>
    `;
  } catch (error) {
    console.error('Error fetching coin data:', error);
  }
}

function updateTime() {
  const timeElement = document.getElementById('time');
  const currentTime = new Date().toLocaleTimeString('en-us', {
    timeStyle: 'short',
  });
  timeElement.textContent = currentTime;
}

// Call the updateTime function initially to display the current time
updateTime();

// Update the time every second
setInterval(updateTime, 1000);

navigator.geolocation.getCurrentPosition(position => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const baseUrl = 'https://apis.scrimba.com/openweathermap/data/2.5/weather';
  const units = 'metric'; // Use 'metric' for Celsius

  const url = `${baseUrl}?lat=${latitude}&lon=${longitude}&units=${units}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherElement = document.getElementById('weather');
      const city = data.name;
      const temperature = data.main.temp;
      const weatherIcon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

      weatherElement.innerHTML = `
        <h1><img src="${iconUrl}" alt="Weather Icon" /> ${temperature}°C</h3>
          <p>${city}</p>
        `;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
});

// Call the fetchCoinData function to retrieve and update the data
fetchCoinData();
getRandomImage();
