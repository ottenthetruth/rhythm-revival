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
        }
    } //end getUserProfile

async function loadpage() {
  const accessToken = localStorage.getItem("access_token");
  if(accessToken) {
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
        } else { // else status 200
	  getUserProfile();
	}
	  
  } else { // else accessToken
	getUserProfile();
  }
} /* end loadpage */

window.onload = loadpage;
