      function authorizeSpotify() {
          const clientID = "e9fec6e1cb5241e0a41ab98db146bc3c";
          const redirectURI = "https://ottenthetruth.github.io/rhythm-revival/homepage/homepage.html";
          const spotifyAuthURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}&scope=user-library-read%20playlist-read-private`;
          window.location.href = spotifyAuthURL;
      }
