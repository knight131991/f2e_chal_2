import screenEnum from "../constant/screenEnum";
import useBreakPoint from "./useBreakPoint";

export default function useRWD(defaultVal, config) {
  const copyConfig = config || {};
  const { xl = {}, l = {}, m = {}, s = {} } = copyConfig;
  const [screen] = useBreakPoint();

  let result = { ...defaultVal };
  let curScreen;
  switch (screen) {
    case "xxl":
      result = { ...defaultVal, ...xl, screen: screenEnum.xxl };
      break;
    case "xl":
    case "lg":
      curScreen = screenEnum.xl;
      if (screen === "lg") {
        curScreen = screenEnum.lg;
      }
      result = { ...defaultVal, ...xl, ...l, screen: curScreen };
      break;
    case "md":
      result = { ...defaultVal, ...xl, ...l, ...m, screen: screenEnum.md };
      break;
    case "sm":
    case "xs":
      curScreen = screenEnum.sm;
      if (screen === "xs") {
        curScreen = screenEnum.xs;
      }
      result = { ...defaultVal, ...xl, ...l, ...m, ...s, screen: curScreen };
      break;
    default:
      break;
  }
  return result;
}

export function useRWDStyleParams() {
  const params = useRWD(
    { mainPadding: "70px" },
    { l: { mainPadding: "32px" }, s: { mainPadding: "20px" } }
  );

  return params;
}
