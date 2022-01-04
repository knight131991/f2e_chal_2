import axios from "axios";
import { useCallback, useState } from "react";
import useApiAdapter from "./useApiAdapter";

export default function useGetBikeStopInfo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { apiAdapter: getMainInfos } = useApiAdapter([]);
  const { apiAdapter: getAvaInfos } = useApiAdapter([]);

  const getBikeStopInfo = useCallback(
    (lat, lon) => {
      const query = `$top=30&$spatialFilter=nearby(25.047675,121.517055,500)&$format=JSON`;
      setLoading(true);
      Promise.all([
        getAvaInfos({
          api: axios.get(
            `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?${query}`
          ),
        }),
        getMainInfos({
          api: axios.get(
            `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?${query}`
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
