export default function utcToTime(utc) {
  if (!utc) return;
  const date = new Date(utc);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
