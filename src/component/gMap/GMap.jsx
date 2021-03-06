import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import GMapReact from "google-map-react";

function GMap({ steps = [], bpoint, center, ...rest }) {
  const [gMap, setGMap] = useState();
  const [gMaps, setGMaps] = useState();

  useEffect(() => {
    let polylinePath;
    if (gMap && gMaps) {
      polylinePath = new gMaps.Polyline({
        path: steps,
        geodesic: false,
        strokeColor: "#008800",
        strokeOpacity: 0.8,
        strokeWeight: 8,
        editable: false,
        draggable: false,
      });

      polylinePath.setMap(gMap);
    }

    return () => {
      if (polylinePath) polylinePath.setMap(null);
    };
  }, [steps, gMaps, gMap]);

  useEffect(() => {
    if (gMap && center) {
      gMap.setCenter(center);
    }
  }, [center, gMap]);

  return (
    <div
      style={{
        // 如果設定高度設定100%,iphone會無法顯示地圖,尚未了解原因,所以先寫死高度
        height: bpoint === "xs" ? "calc(100vh - 140px)" : "100%",
        width: "100%",
      }}
    >
      <GMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: "AIzaSyCnBX045s9vhUBtjDAGmdKlHAKIP42ljOI" }}
        defaultCenter={{
          lat: 25.048,
          lng: 121.516,
        }}
        defaultZoom={15}
        options={{
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#242f3e" }],
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ],
        }}
        onGoogleApiLoaded={({ map, maps }) => {
          setGMap(map);
          setGMaps(maps);
          // console.log("steps", steps);
          // const polylinePath = new maps.Polyline({
          //   path: steps,
          //   geodesic: false,
          //   strokeColor: "#008800",
          //   strokeOpacity: 0.8,
          //   strokeWeight: 8,
          //   editable: false,
          //   draggable: false,
          // });

          // polylinePath.setMap(map);

          // const start = getPos(steps[0]);
          // const end = getPos(steps[steps.length - 1]);
          // steps.forEach((item) => {
          //   const marker = new maps.Marker({
          //     position: getPos(item, false),
          //     map: map,
          //     animation: maps.Animation.DROP, // DROP掉下來、BOUNCE一直彈跳
          //     draggable: false, // true、false可否拖拉
          //   });
          //   const infowindow = new maps.InfoWindow({
          //     content: "wwwwww",
          //   });
          //   // 加入地圖標記點擊事件
          //   marker.addListener("click", function () {
          //     if (infowindow.anchor) {
          //       infowindow.close();
          //     } else {
          //       infowindow.open(map, marker);
          //     }
          //   });
          // });
          // let directionsService = new maps.DirectionsService();
          // var directionsDisplay = new maps.DirectionsRenderer();
          // directionsDisplay.setMap(map);
          // directionsService.route(
          //   {
          //     travelMode: "DRIVING",
          //     drivingOptions: {
          //       trafficModel: "pessimistic",
          //       departureTime: new Date(),
          //     },
          //     waypoints: steps
          //       .slice(1, -1)
          //       .filter((item, id) => id % 2)
          //       .slice(1, 23)
          //       .map((item) => ({ location: getPos(item), stopover: false })),
          //     //   travelMode: "TRANSIT",
          //     //   transitOptions: {
          //     //     routingPreference: "LESS_WALKING",
          //     //     modes: ["BUS"],
          //     //   },
          //     origin: start,
          //     destination: end,
          //   },
          //   (DirectionsResult, DirectionsStatus) => {
          //     if (DirectionsStatus === "OK") {
          //       directionsDisplay.setDirections(DirectionsResult);
          //     }
          //   }
          // );
        }}
        {...rest}
      />
    </div>
  );
}

GMap.propTypes = {};

export default GMap;
