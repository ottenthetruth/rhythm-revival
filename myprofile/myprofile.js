async function getTopTracks() {
  const accessToken = localStorage.getItem('access_token');
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  console.log('Top Tracks:', data.items);
}

async function getTopArtists() {
  const accessToken = localStorage.getItem('access_token');
  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  console.log('Top Artists:', data.items);
}
