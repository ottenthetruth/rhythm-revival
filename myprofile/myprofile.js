async function getTopTracks() {
  const accessToken = localStorage.getItem('access_token');
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  const topsongs = document.querySelector('.topsongs');
  data.items.forEach((track, index) => {
   const topSongContainer = document.createElement('div');
    topSongContainer.classList.add(`topitemcontainer`);
    
    const currentTrackElementImage = document.createElement('img');
    currentTrackElementImage.id = `topsongimage${index}`;
    currentTrackElementImage.src = track.album.images[0].url;
    currentTrackElementImage.alt = `Track ${index + 1} Cover`;
    topSongContainer.appendChild(currentTrackElementImage);

    const currentTrackInfo = document.createElement('div');
    currentTrackInfo.classList.add(`songinfo`);
    topSongContainer.appendChild(currentTrackInfo);
    
    const currentTrackElementText = document.createElement('h1');
    currentTrackElementText.id = `topsongname${index}`;
    currentTrackElementText.textContent = track.name;
    currentTrackInfo.appendChild(currentTrackElementText);

    const currentTrackElementArtist = document.createElement('h2');
    currentTrackElementArtist.id = `topsonginfo${index}`;
    currentTrackElementArtist.textContent = `by ${track.artists[0].name}`;
    currentTrackInfo.appendChild(currentTrackElementArtist);
    
    topsongs.appendChild(topSongContainer);
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
  const topartists = document.querySelector('.topsongs');
  data.items.forEach((artist, index) => {
   const topArtistContainer = document.createElement('div');
    topArtistContainer.classList.add(`topitemcontainer`);
    
    const currentArtistElementImage = document.createElement('img');
    currentArtistElementImage.id = `topartistimage${index}`;
    currentArtistElementImage.src = artist.images[0].url;
    currentArtistElementImage.alt = `Artist ${index + 1} Profile Picture`;
    topArtistContainer.appendChild(currentArtistElementImage);

    const currentArtistInfo = document.createElement('div');
    currentArtistInfo.classList.add(`artistinfo`);
    topSongContainer.appendChild(currentTrackInfo);
    
    const currentArtistElementText = document.createElement('h1');
    currentArtistElementText.id = `topartistname${index}`;
    currentArtistElementText.textContent = artist.genres[0] + ", " + artist.genres[1];
    currentArtistInfo.appendChild(currentTrackElementText);
    
    topsongs.appendChild(topSongContainer);
  });
}
