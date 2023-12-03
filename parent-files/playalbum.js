function playAlbum(contextUri) {
  const accessToken = localStorage.getItem("access_token");

  fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      context_uri: contextUri,
    }),
  })
  .then(response => {
    if (response.status === 204) {
      console.log('Album is playing!');
    } else {
      console.error('Failed to play album:', response.statusText);
    }
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
}
