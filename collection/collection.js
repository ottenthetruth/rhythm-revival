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
          collectionCard.classList.add("card");
          collectionCard.innerHTML = `
          <img src="${album.images[0].url}" style="width: 200px; height: 200px;">
          <h4>${album.name}</h4>
          <h5>${album.artists[0].name}</h5>
          <h5>${myRating}</h5>
          `;
          albumContainer.appendChild(collectionCard);
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
