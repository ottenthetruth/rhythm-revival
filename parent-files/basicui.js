   async function getUserProfile() {
	   const accessToken = await getAccessToken("https://ottenthetruth.github.io/truthmusic/homepage/homepage.html");
        const response = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            const myDisplayName = data.display_name;
            const profilePictureUrl = data.images.length > 0 ? data.images[0].url : '';

            var myUserImage = document.getElementById('profileImage');
            myUserImage.src = profilePictureUrl;
            var myUserDisplayName = document.getElementById('displayName');
            myUserDisplayName.innerText = myDisplayName;
	    var logButton = document.getElementById("logBtn");
	    logButton.style.display = "none";
	    logButton.disabled = true;
        } else {
        }
    }
    async function getCurrentlyPlaying() {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
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

		document.getElementById('musicPlayerSong').textContent = songName;
                document.getElementById('musicPlayerArtist').textContent = 'by ' + artistName;
                document.getElementById('musicPlayerAlbum').textContent = 'on ' + albumName;
		
                const albumCoverElement = document.getElementById('musicPlayerCover');
                albumCoverElement.src = albumCoverUrl;
                albumCoverElement.alt = `${albumName} Album Cover`;
            }
        }
    }

async function loadpage() {
	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get("code");
	if(code !== null){
		getUserProfile();
		getCurrentlyPlaying();
	}
} /* end loadpage */
window.onload = loadpage;
