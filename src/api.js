// export const api = {
//   calculateTravelTime: function(userLocation, selectedShopLocation, methodOfTrans, callback) {
//     var bounds = new google.maps.LatLngBounds;

//     var origin1 = userLocation;
//     var destinationA = selectedShopLocation;
//     var geocoder = new google.maps.Geocoder;

//     var service = new google.maps.DistanceMatrixService;
//     service.getDistanceMatrix({
//         origins: [origin1],
//         destinations: [destinationA],
//         travelMode: 'driving',
//         unitSystem: google.maps.UnitSystem.IMPERIAL,
//         avoidHighways: false,
//         avoidTolls: false
//     }, function(response, status) {
//         if (status !== google.maps.DistanceMatrixStatus.OK) {
//             alert('Error was: ' + status);
//         } else {
//             var originList = response.originAddresses;
//             var destinationList = response.destinationAddresses;
//         callback(response);
//     }
//   });
// }
// };