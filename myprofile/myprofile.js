async function getTopTracks() {
  let firstrun = 0;
  const accessToken = localStorage.getItem('access_token');
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  const topsongs = document.querySelector('.topsongs');
  data.items.forEach((track, index) => {
    if(firstrun === 0) {
      const firstSongElementImage = track.album.images[0].url;
      const firstSongElement = document.getElementById("topsongimage0");
      firstSongElement.src = firstSongElementImage;
      const firstSongName = document.getElementById("topsongname0");
      const firstSongInfo = document.getElementById("topsonginfo0");
      firstSongName.textContent = track.name;
      firstSongInfo.textContent = `by ${track.artists[0].name}`;
      firstrun = 1;
    }
    
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
  const topartists = document.querySelector('.topartists');
  let firstrun = 0;
  data.items.forEach((artist, index) => {
    if(firstrun === 0) {
      const firstArtistElementImage = artist.images[1].url;
      const firstArtistElement = document.getElementById("topartistimage0");
      firstArtistElement.src = firstArtistElementImage;
      const firstArtistName = document.getElementById("topartistname0");
      const firstArtistInfo = document.getElementById("topartistinfo0");
      const firstArtistButton = document.getElementById("playtopartistxx");
      firstArtistName.textContent = artist.name;
      firstArtistInfo.textContent = artist.genres[0] + ", " + artist.genres[1];
      firstArtistButton.addEventListener('click', () => {
        getAvailableDevices();
        const artistContextUri = firstArtistButton.getAttribute('data-context-uri');
        playAlbum(artistContextUri);
      });
      firstrun = 1;
    }
  
   const topArtistContainer = document.createElement('div');
    topArtistContainer.classList.add(`topitemcontainer`);
    
    const currentArtistElementImage = document.createElement('img');
    currentArtistElementImage.id = `topartistimage${index}`;
    currentArtistElementImage.src = artist.images[2]?.url || '../images/No Music.jpg';
    currentArtistElementImage.alt = `Artist ${index + 1} Profile Picture`;
    topArtistContainer.appendChild(currentArtistElementImage);

    const currentArtistInfo = document.createElement('div');
    currentArtistInfo.classList.add(`artistinfo`);
    topArtistContainer.appendChild(currentArtistInfo);
    
    const currentArtistElementText = document.createElement('h1');
    currentArtistElementText.id = `topartistname${index}`;
    currentArtistElementText.textContent = artist.name;
    currentArtistInfo.appendChild(currentArtistElementText);
    
    const currentArtistElementGenre = document.createElement('h2');
    currentArtistElementGenre.id = `topartistname${index}`;
    currentArtistElementGenre.textContent = artist.genres[0] + ", " + artist.genres[1];
    currentArtistInfo.appendChild(currentArtistElementGenre);

    const currentArtistPlayButton = document.createElement('button');
    currentArtistPlayButton.textContent = "Play on Spotify!";
    currentArtistPlayButton.setAttribute('data-context-uri', artist.uri);
    currentArtistPlayButton.addEventListener('click', () => {
        getAvailableDevices();
        const artistContextUri = currentArtistPlayButton.getAttribute('data-context-uri');
        playAlbum(artistContextUri);
      });
    currentArtistInfo.appendChild(currentArtistPlayButton);
    
    topartists.appendChild(topArtistContainer);
  });
}
