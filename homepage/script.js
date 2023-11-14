let userProfile = {
  displayName: '',
  profileImage: ''
};

function loginToSpotify() {
  // Simulating the access token retrieval, replace with your actual method of obtaining the token
  const accessToken = getAccessToken();

  fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  })
  .then(response => response.json())
  .then(data => {
    userProfile.displayName = data.display_name;
    userProfile.profileImage = data.images[0].url; // Get the first image

    updateProfileInfo();
    document.querySelector('button').style.display = 'none'; // Hide login button after successful login
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function updateProfileInfo() {
  document.getElementById('displayName').innerText = userProfile.displayName;
  document.getElementById('profileImage').src = userProfile.profileImage;
  document.getElementById('profileInfo').style.display = 'block';
}
