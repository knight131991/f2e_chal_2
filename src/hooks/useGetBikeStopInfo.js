import axios from "axios";
import { useCallback, useState } from "react";
import useApiAdapter from "./useApiAdapter";

export default function useGetBikeStopInfo() {
  const { apiAdapter: getStopInfos } = useApiAdapter([]);
  const { apiAdapter: getAvaInfos } = useApiAdapter([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBikeStopInfo = useCallback(
    ({
      lat,
      lng,
      city,
      search = "",
      noSearchResultCB = () => {},
      onSuccess = () => {},
      top = "30",
      youbikeVer,
      distance,
    }) =>
      new Promise((resolve, reject) => {
        const posFilter = `$spatialFilter=nearby(${lat},${lng},${distance})`;
        const filters = `$filter=(contains(StationName/Zh_tw,'${search}') or contains(StationAddress/Zh_tw,'${search}')) ${
          youbikeVer ? `and ServiceType eq ${youbikeVer}` : ""
        }`;
        setIsLoading(true);
        getStopInfos({
          api: axios.get(
            `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/City/${
              city ? city : "NearBy"
            }?$top=${top}&$format=JSON&${filters}${
              lat !== undefined && lng !== undefined && distance
                ? `&${posFilter}`
                : ""
            }`
          ),
          mapper: (resp) => resp.data,
          onSuccess: (infos) => {
            const stationFilters = infos
              .map(({ StationUID }) => StationUID)
              .reduce((pre, cur) => {
                if (pre) return `${pre} or contains(StationUID,'${cur}')`;
                return `contains(StationUID,'${cur}')`;
              }, "");

            if (stationFilters.length === 0) {
              noSearchResultCB(true);
              setIsLoading(false);
              setData([]);
              resolve([]);
              return;
            }

            getAvaInfos({
              api: axios.get(
                `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/City/${
                  city ? city : "NearBy"
                }?$top=300&$format=JSON&$filter=(${stationFilters}) ${
                  youbikeVer ? `and ServiceType eq ${youbikeVer}` : ""
                }`
              ),
              mapper: (resp) => resp.data,
              onError: (err) => reject(err),
              onSuccess: (avaInfos) => {
                const results = infos.map((item, id) => {
                  if (item.StationUID !== avaInfos[id].StationUID) {
                    console.error("站點資訊有誤");
                  }
                  return { ...item, ...avaInfos[id] };
                });
                noSearchResultCB(false);
                setData(results);
                setIsLoading(false);
                resolve(results);
                onSuccess(results);
              },
            });
          },
        });
      }),
    [getStopInfos, getAvaInfos]
  );

  return { getBikeStopInfo, data, loading: isLoading };
}
