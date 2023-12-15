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
    const currentTrackElementImage = document.getElementById(`topsongimage${index}`);
    if(currentTrackElementText) {
      currentTrackElementText.textContent = track.name;
      currentTrackElementImage.src = track.album.images[0].url;
      currentTrackElementImage.alt = `Track ${index + 1} Cover`;
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
    const currentArtistElementImage = document.getElementById(`topartistimage${index}`);
    if(currentArtistElementText) {
      currentArtistElementText.textContent = artist.name;
    }
    if(currentArtistElementImage) { 
      currentArtistElementImage.src = artist.images[0].url;
      currentArtistElementImage.alt = `Artist ${index + 1} Profile Picture`;
    }
    console.log(`Artist ${index + 1}: ${artist.name}`);
  });
}