async function getTopTracks() {
  const accessToken = localStorage.getItem('access_token');
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  const topartists = document.querySelector('.topartists');
  data.items.forEach((track, index) => {
   const topSongContainer = document.createElement('div');
    topSongContainer.classList.add(`topsongcontainer${index}`);
    
    const currentTrackElementText = document.createElement('p');
    currentTrackElementText.id = `topsongname${index}`;
    currentTrackElementText.textContent = track.name;
    topSongContainer.appendChild(currentTrackElementText);
    
    const currentTrackElementImage = document.createElement('img');
    currentTrackElementImage.id = `topsongimage${index}`;
    currentTrackElementImage.src = track.album.images[0].url;
    currentTrackElementImage.alt = `Track ${index + 1} Cover`;
    topSongContainer.appendChild(currentTrackElementImage);
    
    const currentTrackElementArtist = document.createElement('p');
    currentTrackElementArtist.id = `topsonginfo${index}`;
    currentTrackElementArtist.textContent = `by ${track.artists[0].name}`;
    topSongContainer.appendChild(currentTrackElementArtist);
    
    topartists.appendChild(topSongContainer);
  });
}

async function getTopArtists() {
  const accessToken = localStorage.getItem('access_token');
  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=20`, {
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
