async function rateAlbum() {
  for (let i = 1; i <= 10; i++) {
    if (document.getElementById(`rating${i}`).checked) {
      console.log(`Rating = ${i}!`);
      localStorage.setItem("newrating", i);
      break;
    }
  }
  let prevCollectionString = localStorage.getItem("mycollection");
  const myContextUri = localStorage.getItem("va-contexturi");
  const myAlbumID = localStorage.getItem("va-albumid");
  const myAlbumName = localStorage.getItem("va-albumname");
  const rating = localStorage.getItem("newrating");
  if(prevCollection) {
    let prevCollection = JSON.parse(prevCollectionString);
    prevCollection.push(myAlbumName, rating, myAlbumID, myContextUri);
    localStorage.setItem("mycollection", JSON.stringify[prevCollection]);
  } else {
    let albumCollection = [
      myAlbumName,
      rating,
      myAlbumID,
      myContextUri
    ]
    localStorage.setItem("mycollection", JSON.stringify[albumCollection]);
  }
}

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
                        <button class="gotoalbumbutton" data-album-name="${album.name}" data-context-uri="${album.uri}" data-album-id="${album.id}">Go to Album</button>
                    </div>
                    `;
                    cardContainer.appendChild(card);
                });
                const playButtons = document.querySelectorAll('.playalbumbutton');
                playButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        getAvailableDevices();
                        const contextUri = button.getAttribute('data-context-uri');
                        playAlbum(contextUri);
                    });
                });
                const vaButtons = document.querySelectorAll('.gotoalbumbutton');
                vaButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const albumName = button.getAttribute('data-album-name');
                        const albumID = button.getAttribute('data-album-id');
                        const contextUri = button.getAttribute('data-context-uri');
                        localStorage.setItem("va-albumname", albumName);
                        localStorage.setItem("va-albumid", albumID);
                        localStorage.setItem("va-contexturi", contextUri);
                        openPopup();
                    });
                });
                
            }
        }
    }
}

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

function fetchAlbumData() {
  const albumID = localStorage.getItem("va-albumid");
  const accessToken = localStorage.getItem("access_token");
  fetch(`https://api.spotify.com/v1/albums/${albumID}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('va-albumImage').src = data.images[0].url;
    document.getElementById('va-albumName').textContent = data.name;
    const artists = data.artists.map(artist => artist.name);
    document.getElementById('va-artistName').textContent = 'by ' + artists.join(', ');
    const tableBody = document.getElementById('va-songList');
    tableBody.innerHTML = '';
    data.tracks.items.forEach(track => {
      const row = tableBody.insertRow();
      const titleCell = row.insertCell(0);
      const durationCell = row.insertCell(1);
      titleCell.textContent = track.name;
      durationCell.textContent = msToMinutesAndSeconds(track.duration_ms);
    });
  })
  .catch(error => {
    console.error('Error fetching album data:', error);
  });
}

function msToMinutesAndSeconds(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}

function openPopup() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.display = "block";
    setTimeout(() => {
      document.getElementById("overlay").style.opacity = "1";
      document.getElementById("popup").style.transform = "translate(-50%, -50%) scale(1)";
    }, 50);
    fetchAlbumData();
}

function closePopup() {
    document.getElementById("overlay").style.opacity = "0";
    document.getElementById("popup").style.transform = "translate(-50%, -50%) scale(0)";
    setTimeout(() => {
      document.getElementById("overlay").style.display = "none";
      document.getElementById("popup").style.display = "none";
    }, 300);
}
