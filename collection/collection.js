async function displayCollection() {
let myCollectionString = localStorage.getItem("mycollection");
if(myCollectionString) {
  let myCollection = JSON.parse(myCollectionString);
  let itemCount = myCollection.length / 4;
  let spotifyRequestIDs = "ids=";
  for(let i = 0; i < itemCount; i++) {
      const albumIDIndex = (i * 4) + 2;
      spotifyRequestIDs += myCollection[albumIDIndex];
        if (i !== itemCount - 1) { spotifyRequestIDs += ","; }
  }
  
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch(`https://api.spotify.com/v1/albums?${spotifyRequestIDs}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  
  if (response.status === 200) {
    const data = await response.json();
    const albumContainer = document.getElementById("albumContainer");
    if(data) {
      let myRatingIndex = 1;
      data.albums.forEach(album => {
          const collectionCard = document.createElement("div");
          let myRating = myCollection[myRatingIndex];
          myRatingIndex = myRatingIndex + 4;
          collectionCard.classList.add("collectionCard");
          collectionCard.innerHTML = `
          <img src="${album.images[0].url}" style="width: 200px; height: 200px;">
          <div class="collectionCardInfo">
            <h1>${album.artists[0].name}'s ${album.name}</h1>
            <h2>${album.total_tracks} Tracks, ${album.release_date}</h2>
            <h2>Rating: ${myRating}</h2>
            <div class="collectionCardControls">
              <button class="collectionCardButtonPlay" data-context-uri="${album.uri}">Play!</button>
              <button class="collectionCardButtonRemove" data-context-uri="${album.uri}">Remove</button>
            </div>
          </div>
          `;
          albumContainer.appendChild(collectionCard);
        });
        const playButtons = document.querySelectorAll('.collectionCardButtonPlay');
        playButtons.forEach(button => {
            button.addEventListener('click', () => {
               getAvailableDevices();
               const contextUri = button.getAttribute('data-context-uri');
               playAlbum(contextUri);
            });
        });
        const removeButtons = document.querySelectorAll('.collectionCardButtonRemove');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
               getAvailableDevices();
               const contextUri = button.getAttribute('data-context-uri');
               removeAlbumFromCollection(contextUri);
            });
        });
    }
  }
} /*if mycollectionstring*/
}

async function removeAlbumFromCollection(contextUri) {
  let myCollectionString = localStorage.getItem("mycollection");
  if(myCollectionString) {
  let myCollection = JSON.parse(myCollectionString);
  let contextUriPosition = myCollection.indexOf(contextUri);
  myCollection.splice(contextUriPosition - 3, 4);
  localStorage.setItem("mycollection", JSON.stringify(myCollection));
  const albumContainer = document.getElementById("albumContainer");
  albumContainer.innerHTML = '';
  displayCollection();
  }/*if mycollectionstring*/
}
