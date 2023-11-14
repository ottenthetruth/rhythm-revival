async function authorizeSpotify() {
  const clientID = "e9fec6e1cb5241e0a41ab98db146bc3c";
  const redirectURI = encodeURIComponent("https://ottenthetruth.github.io/rhythm-revival/homepage/homepage.html");
  const callbackURL = encodeURIComponent("https://ottenthetruth.github.io/rhythm-revival/searchforalbums/searchforalbums.html");
  const spotifyAuthURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}&scope=user-library-read%20playlist-read-private&state=${callbackURL}`; 
  window.location.href = spotifyAuthURL;
}

function updateProfileInfo() {
  document.getElementById('displayName').innerText = userProfile.displayName;
  document.getElementById('profileImage').src = userProfile.profileImage;
  document.getElementById('profileInfo').style.display = 'block';
}

let userProfile = {
  displayName: '',
  profileImage: ''
};
