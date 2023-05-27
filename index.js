import _ from "lodash";

export default function solution(content) {
  // BEGIN

  const rows = content
    .trim()
    .split("\n")
    .map((row) => row.split(","));
  const headerNames = rows[0];
  const [
    date,
    maxT,
    minT,
    humidity,
    pressure,
    windSpeed,
    windDir,
    city,
    state,
    timeZone,
  ] = headerNames;
  const data = rows.slice(1).map((row) => {
    const structuredRow = new Map();
    row.forEach((element, i) => {
      let value = element;
      if ([maxT, minT, humidity, pressure, windSpeed].includes(headerNames[i]))
        value = Number(element);
      structuredRow.set(headerNames[i], value);
    });
    return structuredRow;
  });
  // #1 ---
  console.log(`Count: ${data.length}`);

  // END
}
