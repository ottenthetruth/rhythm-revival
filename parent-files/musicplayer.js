const pauseButton = document.getElementById('pauseButton');
let isPlaying = false; // Track current playback state

playButton.addEventListener('click', () => {
  if (isPlaying) {
    pausePlayback();
  } else {
    resumePlayback();
  }
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
      isPlaying = false;
      updateButtonLabel();
      alert('Playback paused.');
    } else {
      alert('Unable to pause playback.');
    }
  })
  .catch(error => {
    console.error('Error pausing playback:', error);
  });
  } //end if code
} //end pauseplayback

function checkPlaybackState() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  
  if(code) {
  const accessToken = localStorage.getItem("access_token");
  fetch('https://api.spotify.com/v1/me/player', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      console.error('Error fetching playback state.');
    }
  })
  .then(data => {
    if (data && data.is_playing !== undefined) {
      isPlaying = data.is_playing;
      updateButtonLabel();
    } else {
      console.error('Invalid data received.');
    }
  })
  .catch(error => {
    console.error('Error checking playback state:', error);
  });
  } // end if code
} // end checkPlaybackState

function resumePlayback() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  
  if(code) {
  const accessToken = localStorage.getItem("access_token"); // Replace with the user's access token after authentication

  fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => {
    if (response.ok) {
      isPlaying = true;
      updateButtonLabel();
      console.log('Playback resumed.');
    } else {
      console.error('Unable to resume playback.');
    }
  })
  .catch(error => {
    console.error('Error resuming playback:', error);
  });
  } //end if code
} //end resumePlayback

function updateButtonLabel() {
  playPauseButton.innerText = isPlaying ? 'Pause' : 'Play';
}
