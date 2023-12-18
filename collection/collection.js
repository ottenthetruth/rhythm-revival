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
      let myCollectionCardIndex = 1;
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
            <div class="ratedisplay">
              <fieldset class="rate">
                <input type="radio" name="rating" id="rating${myCollectionCardIndex}10" value="10" /><label for="rating${myCollectionCardIndex}10" title="5 stars"></label>
                <input type="radio" name="rating" id="rating${myCollectionCardIndex}9" value="9" /><label class="half" for="rating${myCollectionCardIndex}9" title="4 1/2 stars"></label>
                <input type="radio" name="rating" id="rating${myCollectionCardIndex}8" value="8" /><label for="rating${myCollectionCardIndex}8" title="4 stars"></label>
                <input type="radio" name="rating" id="rating${myCollectionCardIndex}7" value="7" /><label class="half" for="rating${myCollectionCardIndex}7" title="3 1/2 stars"></label>
                <input type="radio" name="rating" id="rating${myCollectionCardIndex}6" value="6" /><label for="rating${myCollectionCardIndex}6" title="3 stars"></label>
                <input type="radio" name="rating" id="rating${myCollectionCardIndex}5" value="5" /><label class="half" for="rating${myCollectionCardIndex}5" title="2 1/2 stars"></label>
                <input type="radio" name="rating" id="rating${myCollectionCardIndex}4" value="4" /><label for="rating${myCollectionCardIndex}4" title="2 stars"></label>
                <input type="radio" name="rating" id="rating${myCollectionCardIndex}3" value="3" /><label class="half" for="rating${myCollectionCardIndex}3" title="1 1/2 stars"></label>
                <input type="radio" name="rating" id="rating${myCollectionCardIndex}2" value="2" /><label for="rating${myCollectionCardIndex}2" title="1 star"></label>
                <input type="radio" name="rating" id="rating${myCollectionCardIndex}1" value="1" /><label class="half" for="rating${myCollectionCardIndex}1" title="1/2 star"></label>
              </fieldset>
            </div>
            <div class="collectionCardControls">
              <button class="collectionCardButtonPlay" data-context-uri="${album.uri}">Play!</button>
              <button class="collectionCardButtonRemove" data-context-uri="${album.uri}">Remove</button>
            </div>
          </div>
          `;
          albumContainer.appendChild(collectionCard);
          myCollectionCardIndex = myCollectionCardIndex + 1;
        }); /* end foreach album */
  
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
    getRatings();
    } /* end if data */
  } /* end if response 200 */
} /*if mycollectionstring*/
} /* end displaycollection  */

function getRatings() {
  let myCollectionString = localStorage.getItem("mycollection");
if(myCollectionString) {
  let myCollection = JSON.parse(myCollectionString);
  let myRatingIndex = 1;
  let myCollectionCardIndex = 1;
  let albumCount = myCollection.length / 4;
  for(let i = 0; i < albumCount; i++) {
    const myRating = myCollection[myRatingIndex];
    const myButton = document.getElementById(`rating${myCollectionCardIndex}${myRating}`);
    myButton.click();
    myButton.checked = true;
    console.log("Clicked Button!");
    myRatingIndex = myRatingIndex + 4;
    myCollectionCardIndex = myCollectionCardIndex + 1;
  } /* end for */
  } /* end if myCollectionString */
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
