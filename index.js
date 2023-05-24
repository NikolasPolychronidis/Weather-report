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

    const cryptoElement = document.getElementById('crypto');

    cryptoElement.innerHTML = `
            <img src="${data.image.small}" />
            <span>${data.name}</span>
          `;
  } catch (error) {
    console.error('Error fetching coin data:', error);
  }
}

// Call the fetchCoinData function to retrieve and update the data
fetchCoinData();
getRandomImage();
