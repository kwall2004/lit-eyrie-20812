function reverseGeoCode(latitude, longitude) {
  return Q($.getJSON("https://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitude + "&lon=" + longitude + "&zoom=18&json_callback=?", function (result) {

    return result;
  }));
}

function getAddressParts(latitude, longitude) {
  return reverseGeoCode(latitude, longitude).then(function (result) {
    if (result) {
      if (result.address) {
        return {
          road: result.address.road || 'Unknown',
          city: result.address.city || result.address.village || result.address.locality || result.address.county || 'Unknown',
          state: result.address.state || 'Unknown',
          postcode: result.address.postcode || 'Unknown',
          country: result.address.country || 'Unknown'
        };
      }
    }

    throw 'Could not reverse geocode.';

  }).fail(function () {
    return {
      road: 'Unknown',
      city: 'Unknown',
      state: 'Unknown',
      postcode: 'Unknown',
      country: 'Unknown'
    };
  });
}

function getDisplayLocation(latitude, longitude) {
  return reverseGeoCode(latitude, longitude).then(function (result) {
    if (result) {
      if (result.display_name) {
        return result.display_name;
      }
    }

    return 'Unknown';
  }).fail(function () { return 'Unknown'; });
}

var vm = {
  getAddressParts: getAddressParts,
  getDisplayLocation: getDisplayLocation
};

export default vm;
