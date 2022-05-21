export default function fitGMapBounds(map, maps, stops = []) {
  if (map && maps && stops) {
    const LatLngList = stops.map(({ lat, lng }) => {
      return new maps.LatLng(lat, lng);
    });
    const latlngbounds = new maps.LatLngBounds();

    LatLngList.forEach(function (latLng) {
      latlngbounds.extend(latLng);
    });

    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);
  }
}
