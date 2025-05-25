function updateLocation(position) {
  document.getElementById('status').textContent = 'Location acquired';
  document.getElementById('lat').textContent = position.coords.latitude.toFixed(5);
  document.getElementById('lon').textContent = position.coords.longitude.toFixed(5);
}

function showError(err) {
  document.getElementById('status').textContent = 'Error getting location';
  console.error(err);
}

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(updateLocation, showError);
} else {
  document.getElementById('status').textContent = 'Geolocation not supported.';
}
