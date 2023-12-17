async function getTopTracks() {
  const accessToken = localStorage.getItem('access_token');
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  data.items.forEach((track, index) => {
    const currentTrackElementText = document.getElementById(`topsongname${index}`);
    const currentTrackElementImage = document.getElementById(`topsongimage${index}`);
    const currentTrackElementArtist = document.getElementById(`topsonginfo${index}`);
    if(currentTrackElementText) {
      currentTrackElementText.textContent = track.name;
    }
    if(currentTrackElementArtist) {
      currentTrackElementArtist.textContent = "by " + track.artists[0].name;
    }
      currentTrackElementImage.src = track.album.images[0].url;
      currentTrackElementImage.alt = `Track ${index + 1} Cover`;
  });
}

async function getTopArtists() {
  const accessToken = localStorage.getItem('access_token');
  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  data.items.forEach((artist, index) => {
    const currentArtistElementText = document.getElementById(`topartistname${index}`);
    const currentArtistElementImage = document.getElementById(`topartistimage${index}`);
    const currentArtistElementGenre = document.getElementById(`topartistinfo${index}`);
    const currentArtistElementPlayButton = document.getElementById(`playtopartist${index}`);
    if(currentArtistElementText) {
      currentArtistElementText.textContent = artist.name;
    }
    if(currentArtistElementGenre){
      currentArtistElementGenre.textContent = artist.genres[0] + ", " + artist.genres[1];
    }
    if(currentArtistElementImage) { 
      currentArtistElementImage.src = artist.images[0].url;
      currentArtistElementImage.alt = `Artist ${index + 1} Profile Picture`;
    }
    if(currentArtistElementPlayButton) {
      currentArtistElementPlayButton.setAttribute('data-context-uri', artist.uri);
      currentArtistElementPlayButton.addEventListener('click', () => {
        getAvailableDevices();
        const artistContextUri = currentArtistElementPlayButton.getAttribute('data-context-uri');
        playAlbum(artistContextUri);
      });
    }
  });
}
