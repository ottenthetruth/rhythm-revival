async function getTopTracks() {
  const accessToken = localStorage.getItem('access_token');
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  data.items.forEach((track, index) => {
    const currentTrackElementText = document.getElementById(`topsongname${index}`);
    if(currentTrackElementText) {
      currentTrackElementText.textContent = track.name;
    }
    console.log(`Track ${index + 1}: ${track.name}`);
  });
}

async function getTopArtists() {
  const accessToken = localStorage.getItem('access_token');
  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  data.items.forEach((artist, index) => {
    const currentArtistElementText = document.getElementById(`topartistname${index}`);
    if(currentArtistElementText) {
      currentArtistElementText.textContent = artist.name;
    }
    console.log(`Artist ${index + 1}: ${artist.name}`);
  });
}
