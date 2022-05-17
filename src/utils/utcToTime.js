export default function utcToTime(utc) {
  const date = new Date(utc);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
