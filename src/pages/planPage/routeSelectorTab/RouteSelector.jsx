import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import GMap from "../../../component/gMap/GMap";
import SwitchableMainContentLayout from "../../../component/SwitchableMainContentLayout";
import fitGMapBounds from "../../../utils/fitGMapBounds";
import useGetFilteredRouteInfo from "../../../hooks/useGetFilteredRouteInfo";
import SelectableRouteMarks from "../../../component/gMap/SelectableRouteMarks";
import useRWD from "../../../hooks/useRWD";
import screenEnum from "../../../constant/screenEnum";
import RouteInfoListGroup from "../../../component/custom/RouteInfoListGroup";

function RouteSelector({
  routeInfos,
  onSelectRoute,
  loading,
  dirFilter,
  city,
  routeLen,
  searchRoute,
}) {
  const [map, setMap] = useState();
  const [maps, setMaps] = useState();
  const [selectedRoute, setSelectedRoute] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState();
  const refEle = useRef({ list: [] });
  const { screen } = useRWD();

  const { filteredRouteInfos, routeStartStops } = useGetFilteredRouteInfo(
    dirFilter,
    routeInfos
  );

  const handleSelectRoute = useCallback((map, maps, geometry, id) => {
    setSelectedRoute(geometry);
    fitGMapBounds(map, maps, geometry);
    setSelectedRouteId(id);
  }, []);

  useEffect(() => {
    fitGMapBounds(map, maps, routeStartStops);
  }, [routeStartStops, map, maps]);

  useEffect(() => {
    setSelectedRoute([]);
    setSelectedRouteId();
  }, [dirFilter, city, routeLen, searchRoute]);

  return (
    <SwitchableMainContentLayout
      loading={loading}
      switchMode={screen <= screenEnum.md}
      leftContent={
        <RouteInfoListGroup
          routInfos={filteredRouteInfos}
          refEle={refEle}
          selectedRouteId={selectedRouteId}
          onClickCard={(Geometry, id) =>
            handleSelectRoute(map, maps, Geometry, id)
          }
          onClickCardBtn={(infos) => onSelectRoute(infos)}
        />
      }
      rightContent={
        <GMap
          steps={selectedRoute}
          onMount={(map, maps) => {
            setMap(map);
            setMaps(maps);
          }}
        >
          {SelectableRouteMarks({
            selectedRoute: selectedRoute,
            allRouteStartStops: routeStartStops,
            onClickRouteMark: (id) => {
              handleSelectRoute(map, maps, filteredRouteInfos[id].Geometry, id);
              refEle.current.list[id].scrollIntoView({ behavior: "smooth" });
            },
          })}
        </GMap>
      }
    />
  );
}

RouteSelector.propTypes = {
  city: "",
  routeInfos: [],
  onSelectCity: () => {},
  onSelectRoute: () => {},
  onSearch: () => {},
  dirFilter: [],
  searchStop: "",
};
RouteSelector.propTypes = {
  city: PropTypes.string,
  routeInfos: PropTypes.arrayOf(PropTypes.any),
  onSelectCity: PropTypes.func,
  onSelectRoute: PropTypes.func,
  onSearch: PropTypes.func,
  dirFilter: PropTypes.arrayOf(PropTypes.string),
  searchStop: PropTypes.string,
};

export default RouteSelector;
