import axios from "axios";
import { useCallback } from "react";
import useApiAdapter from "./useApiAdapter";

export default function useGetRoute(defaultVal) {
  const { data, isLoading, apiAdapter } = useApiAdapter(defaultVal);

  const getRoute = useCallback(
    (city, dataMapper = (val) => val, searchKey, routeLen) =>
      apiAdapter({
        api: axios.get(
          `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/City/${city}?$top=30&$filter=RoadSectionStart ne null and RoadSectionEnd ne null and Direction ne null ${
            searchKey ? `and contains(RouteName,'${searchKey}')` : ""
          } ${routeLen ? `and ${routeLen}` : ""} `
        ),
        mapper: (resp) => {
          const routeInfos = resp.data.map(
            ({ Geometry, CyclingLength, ...rest }) => {
              const regEx = /(\d*\.\d*)\s(\d*\.\d*)/g;
              const geometrys = [];
              let arr;
              while ((arr = regEx.exec(Geometry)) !== null) {
                geometrys.push({ lat: Number(arr[2]), lng: Number(arr[1]) });
              }
              return {
                ...rest,
                Geometry: geometrys,
                CyclingLength: (
                  Math.round((CyclingLength / 1000) * 100) / 100
                ).toFixed(2),
              };
            }
          );
          return dataMapper(routeInfos);
        },
      }),
    [apiAdapter]
  );

  return { data, isLoading, getRoute };
}
