const pauseButton = document.getElementById('pauseButton');

pauseButton.addEventListener('click' () => {
  pausePlayback();
});

function pausePlayback() {

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
  if(code) {
  const accessToken = localStorage.getItem("access_token");

    fetch('https://api.spotify.com/v1/me/player/pause', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => {
    if (response.ok) {
      alert('Playback paused.');
    } else {
      alert('Unable to pause playback.');
    }
  })
  .catch(error => {
    console.error('Error pausing playback:', error);
  });
  } //end if code
}
