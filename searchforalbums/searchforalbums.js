/* display search results */
async function getAlbums() {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
        const searchQuery = document.getElementById("mysearch").value;
        const searchQueryArtist = document.getElementById("mysearchartist").value;

        const response = await fetch(`https://api.spotify.com/v1/search?q=remaster%2520album%3A${searchQuery}%2520artist%3A${searchQueryArtist}&type=album&limit=6`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            const albumResult = data.albums.items;
            const cardContainer = document.getElementById("container");
            cardContainer.innerHTML = '';

            if (albumResult) {
                albumResult.forEach(album => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = `
                    <img src="${album.images[0].url}">
                    <h4>${album.name}</h4>
                    <h5>${album.artists[0].name}</h5>
                    <div class="cardcontrolbuttons">
                        <button class="playalbumbutton" data-context-uri="${album.uri}">Play now</button>
                        <button class="gotoalbumbutton" data-context-uri="${album.id}">Go to Album</button>
                    </div>
                    `;
                    cardContainer.appendChild(card);
                });

                const playButtons = document.querySelectorAll('.playalbumbutton');
                playButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const contextUri = button.getAttribute('data-context-uri');
                        playAlbum(contextUri);
                    });
                });

                const vaButtons = document.querySelectorAll('.gotoalbumbutton');
                vaButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const contextUri = button.getAttribute('data-context-uri');
                        localStorage.setItem("va-contexturi", contextUri);
                        window.location.href = '../viewalbum/viewalbum.html';
                    });
                });
                
            }
        }
    }
}

/* search with enter */
var searchbar1 = document.getElementById("mysearch");
var searchbar2 = document.getElementById("mysearchartist");

searchbar1.addEventListener("keypress", function(event) {
  if(event.key === "Enter") {
    document.getElementById("searchButton").click();
  }
});

searchbar2.addEventListener("keypress", function(event) {
  if(event.key === "Enter") {
    document.getElementById("searchButton").click();
  }
});
