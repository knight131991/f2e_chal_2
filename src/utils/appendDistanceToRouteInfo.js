import directionEnum from "../constant/directionEnum";
import getDistanceFromLatLon from "./getDistanceFromLatLon";

export default function appendDistanceToRouteInfo(curPos, routeInfos) {
  return routeInfos.map((route) => {
    const stopPos = { lat: curPos.lat, lng: curPos.lng };
    let dist;
    if (route.Direction === directionEnum.unidirection) {
      dist = getDistanceFromLatLon(route.Geometry[0], stopPos);
    } else if (route.Direction === directionEnum.bilateral) {
      dist = Math.min(
        getDistanceFromLatLon(route.Geometry[0], stopPos),
        getDistanceFromLatLon(
          route.Geometry[route.Geometry.length - 1],
          stopPos
        )
      );
    } else {
      console.error("路線的方向資訊非預期");
    }
    return {
      ...route,
      Distance: (Math.round(dist * 100) / 100).toFixed(2),
    };
  });
}
