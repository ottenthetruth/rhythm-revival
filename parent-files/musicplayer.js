const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const skipForwardButton = document.getElementById('skipForward');

pauseButton.addEventListener('click', () => {
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'block';
    pausePlayback();
});

resumeButton.addEventListener('click', () => {
    pauseButton.style.display = 'block';
    resumeButton.style.display = 'none';
    resumePlayback();
});

skipForwardButton.addEventListener('click', () => {
    skipForward();
    getCurrentlyPlaying();
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

function skipForward() {
    const accessToken = localStorage.getItem("access_token");
    if(accessToken) {
        fetch('https://api.spotify.com/v1/me/player/next', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }) // end fetch
        .then(response => {
        if (response.ok) {
          console.log('Skipped to next song');
        } else {
          console.error('Unable to skip to next song');
        }
      })
      .catch(error => {
        console.error('Error skipping song:', error);
      });        
    } // end if accessToken
} //end skipForward
