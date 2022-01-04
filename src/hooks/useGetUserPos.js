import { useEffect, useState } from "react";

export default function useGetUserPos() {
  const [pos, setPos] = useState({ lat: 25, log: 121 });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPos({ lat: pos.coords.latitude, log: pos.coords.longitude });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return [pos];
}
