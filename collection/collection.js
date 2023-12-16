async function displayCollection() {
let myCollectionString = localStorage.getItem("mycollection");
if(myCollectionString) {
  let myCollection = JSON.parse(myCollectionString);
  let itemCount = myCollection.length / 4;
  const albumContainer = document.getElementById("albumContainer");
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
    const albumsResult = data.albums;
    const albumContainer = document.getElementById("albumContainer");
    if(albumsResult) {
      albumsResult.forEach(albums => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
          <img src="${albums[0].images[0].url}" style="width: 200px; height: 200px;">
          <h4>${albums[0].name}</h4>
          <h5>${albums[0].artists[0].name}</h5>
          `;
          cardContainer.appendChild(card);
        });
    }
  }

  for(let i = 0; i < itemCount; i++) {
    const nameIndex = i * 4;
    const ratingIndex = nameIndex + 1;
    const albumIDIndex = nameIndex + 2;
    const contextUriIndex = nameIndex + 3;

    const albumCard = document.createElement("div");
    albumCard.classList.add("collection-album-card");
    albumCard.innerHTML = `
      <h3>${myCollection[nameIndex]}</h3>
      <p>Rating: ${myCollection[ratingIndex]}</p>
  `;
  albumContainer.appendChild(albumCard);
  } /*end for*/
} /*if mycollectionstring*/

}
