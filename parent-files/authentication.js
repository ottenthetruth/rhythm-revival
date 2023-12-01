async function authforhomepage() {
  /* check if theres already a token */
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  /* end check */
  if(code == null) {
  const clientID = "e9fec6e1cb5241e0a41ab98db146bc3c";
  const redirectURI = "https://ottenthetruth.github.io/truthmusic/homepage/homepage.html";
  const callbackURL = "https://ottenthetruth.github.io/truthmusic/searchforalbums/searchforalbums.html";
  const spotifyAuthURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}&scope=user-library-read%20user-modify-playback-state%20playlist-read-private%20user-read-currently-playing&state=${callbackURL}`;
  window.location.href = spotifyAuthURL;
  }
}

async function authforsearch() {
  /* check if theres arleady a token */
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  /* end check */
  const clientID = "e9fec6e1cb5241e0a41ab98db146bc3c";
  const redirectURI = "https://ottenthetruth.github.io/truthmusic/searchforalbums/searchforalbums.html";
  const spotifyAuthURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}&scope=user-library-read%20playlist-read-private`;
  window.location.href = spotifyAuthURL;
}

async function getAccessToken(myredirecturi) {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
        if (code) {
            const tokenEndpoint = "https://accounts.spotify.com/api/token";
            const client_secret = "2d5a82decbc240e4adadcbd86f342321"; // Replace with your actual client secret
            const redirect_uri = myredirecturi; // Make sure this matches your Spotify App's redirect URI
            const basicAuthHeader = btoa(`e9fec6e1cb5241e0a41ab98db146bc3c:${client_secret}`);

            const data = {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirect_uri,
            };

            const response = await fetch(tokenEndpoint, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${basicAuthHeader}`,
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: new URLSearchParams(data),
            });

            if (response.status === 200) {
                const tokenData = await response.json();
                const accessToken = tokenData.access_token;
                const refreshToken = tokenData.refresh_token;

                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", refreshToken);

                return accessToken;
            } else {
              return localStorage.getItem("access_token");
            }
        }/* end if(code) */

} /* end getAccessToken */

async function refreshAccessToken() {
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
if (code) {
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const client_secret = "2d5a82decbc240e4adadcbd86f342321"; // Replace with your actual client secret
  const redirect_uri = "https://ottenthetruth.github.io/truthmusic/homepage/homepage.html"; // Make sure this matches your Spotify App's redirect URI
  const basicAuthHeader = btoa(`e9fec6e1cb5241e0a41ab98db146bc3c:${client_secret}`);
  const refreshToken = localStorage.getItem("refresh_token");
  fetch(tokenEndpoint, {
     method: "POST",
     headers: {
       "Authorization": `Basic ${basicAuthHeader}`,
       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
  })
   .then(response => response.json())
  .then(data => {
    const newAccessToken = data.access_token;
    const newRefreshToken = data.refresh_token;
    
    localStorage.setItem("access_token", newAccessToken);
    localStorage.setItem("refresh_token", newRefreshToken);
    
    console.log('Refreshed access token & refresh token');
  })
  .catch(error => {
    console.error('Error refreshing access token:', error);
  });
 } // end if code
} //end refreshAccessToken

setInterval(refreshAccessToken, 55 * 60 * 1000);
