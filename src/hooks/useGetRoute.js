import axios from "axios";
import { useCallback } from "react";
import useApiAdapter from "./useApiAdapter";

export default function useGetRoute() {
  const { data, isLoading, apiAdapter } = useApiAdapter();

  const getRoute = useCallback((city) => {
    apiAdapter({
      api: axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${city}?$top=30`
      ),
    });
  }, []);

  return { data, isLoading, getRoute };
}
