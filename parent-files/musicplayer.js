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
                const albumName = data.item.album.name;
                const artistName = data.item.artists[0].name;
                const albumCoverUrl = data.item.album.images[0].url;

                document.getElementById('musicPlayerAlbum').textContent = albumName;
                document.getElementById('musicPlayerArtist').textContent = artistName;

                const albumCoverElement = document.getElementById('musicPlayerCover');
                albumCoverElement.src = albumCoverUrl;
                albumCoverElement.alt = `${albumName} Album Cover`;
            }
        }
    }
