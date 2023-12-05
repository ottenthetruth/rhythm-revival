const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const skipForwardButton = document.getElementById('skipForward');
const skipToPreviousButton = document.getElementById('skipBack');

async function getCurrentlyPlaying() {
	const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
		console.log('CurrentlyPlaying called!');
            // Fetch currently playing track
            const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                const data = await response.json();
		const songName = data.item.name;
                const albumName = data.item.album.name;
                const artistName = data.item.artists[0].name;
                const albumCoverUrl = data.item.album.images[0].url;

		const songProgress = data.progress_ms;
		const songDuration = data.item.duration_ms;
		const progressPercentage = (songProgress / songDuration) * 100;
		localStorage.setItem("song-duration", songDuration);
		
		document.getElementById('musicPlayerSong').textContent = songName;
                document.getElementById('musicPlayerArtist').textContent = 'by ' + artistName;
                document.getElementById('musicPlayerAlbum').textContent = 'on ' + albumName;
		document.getElementById('progress').value = progressPercentage;
		    
                const albumCoverElement = document.getElementById('musicPlayerCover');
                albumCoverElement.src = albumCoverUrl;
                albumCoverElement.alt = `${albumName} Album Cover`;
            }
        }
} // end getCurrentlyPlaying

async function updateSongProgress() {
	const songDuration = localStorage.getItem("song-duration");
	const progressBar = document.getElementById('progress').value;
	const updateValue = 1 / (songDuration*1000);
	const currentWidth = parseInt(progressBar);
	const newWidth = Math.min(currentWidth + updateValue, 100);
	progressBar = newWidth; }

const musicPlayer = document.getElementById('musicplayer');

musicPlayer.addEventListener('mouseenter', function() {
   getCurrentlyPlaying();
   this.interval = setInterval(getCurrentlyPlaying, 16000);
   this.intervalProgressBar = setInterval(updateSongProgress, 1000);
});
musicPlayer.addEventListener('mouseleave', function() {
   clearInterval(this.interval);
   clearInterval(this.intervalProgressBar);
});

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

skipForwardButton.addEventListener('click', skipForwardButtonEvent);
skipToPreviousButton.addEventListener('click', skipToPreviousButtonEvent);

function skipForwardButtonEvent() {
    skipForward()
        .then(() => {
            setTimeout(() => {
                getCurrentlyPlaying();
            }, 500);
        })
        .catch((error) => {
            console.error('Error skipping forward or getting currently playing:', error);
        });
}
function skipToPreviousButtonEvent() {
    skipToPrevious()
        .then(() => {
            setTimeout(() => {
                getCurrentlyPlaying();
            }, 500);
        })
        .catch((error) => {
            console.error('Error skipping to previous song or getting currently playing:', error);
        });
}
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

async function skipForward() {
    const accessToken = localStorage.getItem("access_token");
    if(accessToken) {
        fetch('https://api.spotify.com/v1/me/player/next', {
            method: 'POST',
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

async function skipToPrevious() {
    const accessToken = localStorage.getItem("access_token");
    if(accessToken) {
        fetch('https://api.spotify.com/v1/me/player/previous', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }) // end fetch
        .then(response => {
        if (response.ok) {
          console.log('Skipped to previous song');
        } else {
          console.error('Unable to skip to previous song');
        }
      })
      .catch(error => {
        console.error('Error skipping to prev. song:', error);
      });        
    } // end if accessToken
} //end skipForward
