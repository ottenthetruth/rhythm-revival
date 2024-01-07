async function getUserProfile() {
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
	    myUserImage.style.display = 'block';
            var myUserDisplayName = document.getElementById('displayName');
            myUserDisplayName.innerText = myDisplayName;

	    const myProfileIntroduction = document.getElementById('displayNameIntroduction');
	    if(myProfileIntroduction) { myProfileIntroduction.textContent = myDisplayName + "!"; }

	    var logButton = document.getElementById("logBtn");
	    if(logButton) { 
	    logButton.style.display = "none";
	    logButton.disabled = true; }
	    console.log("Obtained User Profile!");
        }  else { console.log("Failed to obtain User Profile!"); }
  }
localStorage.setItem("loggedin", "true");
}
