import axios from "axios";
import { useCallback, useState } from "react";
import useApiAdapter from "./useApiAdapter";

export default function useGetBikeStopInfo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { apiAdapter: getMainInfos } = useApiAdapter([]);
  const { apiAdapter: getAvaInfos } = useApiAdapter([]);

  const getBikeStopInfo = useCallback(
    (lat, lon, city, search) => {
      const query = `$top=30&$spatialFilter=nearby(${lat},${lon},500)&$format=JSON`;
      const filters = `&$filter=contains(StationName/Zh_tw,'路')`;
      setLoading(true);
      Promise.all([
        getAvaInfos({
          api: axios.get(
            `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/${
              city ? city : "NearBy"
            }?${query}`
          ),
        }),
        getMainInfos({
          api: axios.get(
            `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/${
              city ? city : "NearBy"
            }?${query}`
          ),
        }),
      ]).then((resp) => {
        const avaInfos = resp[0];
        const mainInfos = resp[1];

        if (avaInfos.length !== mainInfos.length) {
          console.error("腳踏車站點資訊不如預期");
          return;
        }

        const infos = avaInfos.map((item, id) => {
          if (item.StationID !== mainInfos[id].StationID) {
            console.error("腳踏車站點資訊不合");
          }
          return { ...item, ...mainInfos[id] };
        });
        setData(infos);
        setLoading(false);
      });
    },
    [getAvaInfos, getMainInfos]
  );

  return { getBikeStopInfo, data, loading };
}
