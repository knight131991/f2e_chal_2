import { useMemo } from "react";

export default function useGetFilteredRouteInfo(dirFilter, routeInfos) {
  const { filteredRouteInfos, routeStartStops } = useMemo(() => {
    let filteredRoutes = routeInfos;
    if (dirFilter.length !== 0)
      filteredRoutes = routeInfos.filter(({ Direction }) =>
        dirFilter.includes(Direction)
      );

    const routeStartStops = filteredRoutes.map(({ Geometry }) => Geometry?.[0]);
    return { filteredRouteInfos: filteredRoutes, routeStartStops };
  }, [dirFilter, routeInfos]);

  return { filteredRouteInfos, routeStartStops };
}
