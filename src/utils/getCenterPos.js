export default function getCenterPos(stops) {
  const center = { lat: 0, lng: 0 };
  if (stops.length === 0) return;
  stops.forEach(({ lat, lng }) => {
    center.lat += lat;
    center.lng += lng;
  });
  center.lat = center.lat / stops.length;
  center.lng = center.lng / stops.length;
  return center;
}
