import useBreakPoint from "./useBreakPoint";

export default function useRWD(defaultVal, config) {
  const copyConfig = config || {};
  const { xl = {}, l = {}, m = {}, s = {} } = copyConfig;
  const [screen] = useBreakPoint();

  let result = { ...defaultVal };
  switch (screen) {
    case "xxl":
      result = { ...defaultVal, ...xl };
      break;
    case "xl":
    case "lg":
      result = { ...defaultVal, ...l };
      break;
    case "md":
      result = { ...defaultVal, ...m };
      break;
    case "sm":
    case "xs":
      result = { ...defaultVal, ...s };
      break;
    default:
      break;
  }
  return result;
}
