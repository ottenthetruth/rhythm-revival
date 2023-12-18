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
          const releaseDate = extractYear(album.release_date);
          collectionCard.innerHTML = `
          <img src="${album.images[0].url}">
          <div class="collectionCardInfo">
            <h1>${album.artists[0].name}'s ${album.name}</h1>
            <h2>${album.total_tracks} Tracks, Released in ${releaseDate}</h2>
            <h2>Rating: ${myRating}</h2>
            <div class="ratedisplay">
              <fieldset class="rate">
                <input type="radio" id="rating10" name="rating" value="10" /><label for="rating10" title="5 stars"></label>
                <input type="radio" id="rating9" name="rating" value="9" /><label class="half" for="rating9" title="4 1/2 stars"></label>
                <input type="radio" id="rating8" name="rating" value="8" /><label for="rating8" title="4 stars"></label>
                <input type="radio" id="rating7" name="rating" value="7" /><label class="half" for="rating7" title="3 1/2 stars"></label>
                <input type="radio" id="rating6" name="rating" value="6" /><label for="rating6" title="3 stars"></label>
                <input type="radio" id="rating5" name="rating" value="5" /><label class="half" for="rating5" title="2 1/2 stars"></label>
                <input type="radio" id="rating4" name="rating" value="4" /><label for="rating4" title="2 stars"></label>
                <input type="radio" id="rating3" name="rating" value="3" /><label class="half" for="rating3" title="1 1/2 stars"></label>
                <input type="radio" id="rating2" name="rating" value="2" /><label for="rating2" title="1 star"></label>
                <input type="radio" id="rating1" name="rating" value="1" /><label class="half" for="rating1" title="1/2 star"></label>
              </fieldset>
            </div>
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

function extractYear(releaseDate) {
    const parts = releaseDate.split('-');
    return parts[0]; }

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
