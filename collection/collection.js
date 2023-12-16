async function displayCollection() {
let myCollectionString = localStorage.getItem("mycollection");
if(myCollectionString) {
  let myCollection = JSON.parse(myCollectionString);
  let itemCount = myCollection.length / 4;
  for(let i = 1; i <= itemCount; i++){
    const nameIndex = i * 4;
    const ratingIndex = nameIndex + 1;
    const albumIDIndex = nameIndex + 2;
    const contextUriIndex = nameIndex + 3;

    const albumCard = document.createElement("div");
    albumCard.classList.add("collection-album-card");

  albumCard.innerHTML = `
    <h3>${myCollection[nameIndex]}</h3>
    <p>Rating: ${myCollection[ratingIndex]}</p>
    <p>Album ID: ${myCollection[albumIDIndex]}</p>
    <p>Context URI: ${myCollection[contextUriIndex]}</p>
    <!-- Add more information or styling as needed -->
  `;
  albumContainer.appendChild(albumCard);
  }
}

}
