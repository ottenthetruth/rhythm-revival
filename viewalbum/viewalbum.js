// Fetch album data function
function fetchAlbumData() {
  const contextUri = localStorage.getItem("va-contexturi");
  const accessToken = localStorage.getItem("access_token");
  // Make a request to Spotify API
  fetch(`https://api.spotify.com/v1/albums/${contextUri}`, {
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
    document.getElementById('va-artistName').textContent = artists.join(', ');

    // Populate table with songs
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

window.onload = fetchAlbumData;
