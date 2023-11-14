async function getAlbums() {
    const accessToken = await getAccessToken();

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
                    <p class="save-link">save!</p>
                    `;
                    const saveLink = card.querySelector(".save-link");
                    saveLink.addEventListener("click", () => handleSaveClick(album));
                    cardContainer.appendChild(card);
                });
            }
        }
    }
}