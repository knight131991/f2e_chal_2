export default function getPos(spot) {
  const {
    StationPosition: { PositionLat, PositionLon },
  } = spot;
  return { lat: PositionLat, lng: PositionLon };
}
