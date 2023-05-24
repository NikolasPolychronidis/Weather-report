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
    console.error('error fetching', error);
  }
}

getRandomImage();
