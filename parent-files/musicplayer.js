const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('skipForward');

pauseButton.addEventListener('click', () => {
    pausePlayback();
});

resumeButton.addEventListener('click', () => {
  resumePlayback();
});

function pausePlayback() {
  const accessToken = localStorage.getItem("access_token");
  if(accessToken) {
    fetch('https://api.spotify.com/v1/me/player/pause', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => {
    if (response.ok) {
      console.log('Playback paused.');
    } else {
      alert('Unable to pause playback.');
    }
  })
  .catch(error => {
    console.error('Error pausing playback:', error);
  });
  } //end if accessToken
} //end pauseplayback

function resumePlayback() {
  const accessToken = localStorage.getItem("access_token");
  if(accessToken) {
  fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => {
    if (response.ok) {
      console.log('Playback resumed.');
    } else {
      console.error('Unable to resume playback.');
    }
  })
  .catch(error => {
    console.error('Error resuming playback:', error);
  });
  } //end if accessToken
} //end resumePlayback
