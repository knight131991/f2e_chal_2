const cityList = [
  { label: "臺北市", code: "TPE", value: "Taipei" },
  { label: "新北市", code: "NWT", value: "NewTaipei" },
  { label: "桃園市", code: "TYN", value: "Taoyuan" },
  { label: "臺中市", code: "TXG", value: "Taichung" },
  { label: "臺南市", code: "TNN", value: "Tainan" },
  { label: "高雄市", code: "KHH", value: "Kaohsiung" },
  { label: "新竹市", code: "HSZ", value: "Hsinchu" },
  { label: "苗栗縣", code: "ZMI", value: "MiaoliCounty" },
  { label: "嘉義市", code: "CYI", value: "Chiayi" },
  { label: "屏東縣", code: "PIF", value: "PingtungCounty" },
  { label: "金門縣", code: "KNH", value: "KinmenCounty" },
];

export const cityEnum = {
  tpe: cityList[0],
  nwt: cityList[1],
  tyn: cityList[2],
  txg: cityList[3],
  tnn: cityList[4],
  khh: cityList[5],
  hsz: cityList[6],
  zmi: cityList[7],
  cyi: cityList[8],
  pif: cityList[9],
  knh: cityList[10],
};

// 新竹市沒有自行車路線，所以偷偷把他轉換到新竹縣
export const stopCityMaptoRouteCity = (city) =>
  city === cityEnum.hsz.value ? "HsinchuCounty" : city;

export default cityList;
