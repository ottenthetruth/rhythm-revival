function playAlbum(contextUri) {
  const accessToken = localStorage.getItem("access_token");
  const deviceID = localStorage.getItem("device_id");
  if(accessToken && deviceID) {
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      context_uri: contextUri,
    }),
  })
  .then(response => {
    if (response.status === 204) {
      console.log('Album is playing!');
    } else {
      console.error('Failed to play album:', response.statusText);
    }
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
  } // end if accessToken & device ID
}
function playSong(contextUri) {
  const accessToken = localStorage.getItem("access_token");
  const deviceID = localStorage.getItem("device_id");
  if(accessToken && deviceID) {
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris: [contextUri],
    }),
  })
  .then(response => {
    if (response.status === 204) {
      console.log('Album is playing!');
    } else {
      console.error('Failed to play album:', response.statusText);
    }
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
  } // end if accessToken & device ID
}
function getAvailableDevices() {
  const accessToken = localStorage.getItem("access_token");

  fetch('https://api.spotify.com/v1/me/player/devices', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch device IDs');
    }
  })
  .then(data => {
    const devices = data.devices;
    const deviceIds = devices.map(device => device.id);
    if(devices.length > 0) {
      const deviceID = devices[0].id;
      console.log('Obtained device IDs!');
      localStorage.setItem("device_id", deviceID); }
  })
  .catch(error => {
    console.error('Error occurred while fetching device IDs:', error);
  });
}
