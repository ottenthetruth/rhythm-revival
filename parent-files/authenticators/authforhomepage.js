function authorizeSpotify() {
      const clientID = "e9fec6e1cb5241e0a41ab98db146bc3c";
      const redirectURI = "https://ottenthetruth.github.io/rhythm-revival/homepage/homepage.html";
      const spotifyAuthURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}&scope=user-library-read%20playlist-read-private`;
      window.location.href = spotifyAuthURL;
      getAccessToken();
}

/* called after authorization */
async function getAccessToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
        if (code) {
            const tokenEndpoint = "https://accounts.spotify.com/api/token";
            const client_secret = "2d5a82decbc240e4adadcbd86f342321"; // Replace with your actual client secret
            const redirect_uri = "https://ottenthetruth.github.io/rhythm-revival/searchforalbums/searchforalbums.html"; // Make sure this matches your Spotify App's redirect URI
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

                localStorage.setItem("access_token", accessToken);

                return tokenData.access_token;
            } else {
              return localStorage.getItem("access_token");
            }
        }/* end if(code) */

} /* end getAccessToken */
