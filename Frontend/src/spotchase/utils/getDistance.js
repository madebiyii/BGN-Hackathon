// Distance between two users
export const getDistance = (currentUser, user) => {
  // Convert degrees to radians
  let lat1 = currentUser?.latitude ? currentUser.latitude : 0;
  let lon1 = currentUser?.longitude ? currentUser.longitude : 0;
  let lat2 = user?.latitude ? user.latitude : 0;
  let lon2 = user?.longitude ? user.longitude : 0;

  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  var R = 6371; // Radius of the Earth in km
  var deltaLat = toRadians(lat2 - lat1);
  var deltaLon = toRadians(lon2 - lon1);
  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);

  // Apply Haversine formula
  var a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var distance = Math.round(R * c); // Distance in km
  return distance;
};
