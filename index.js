// import { array } from "fast-check";
// import _, { values } from "lodash";

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
  // #2 ---
  const cities = data.map((row) => row.get(city));
  const unicCities = Array.from(new Set(cities)).sort();
  console.log(`Cities: ${unicCities.join(", ")}`);
  // #3 --
  const humidityDataSorted = data.map((row) => row.get(humidity)).sort();
  console.log(
    `Humidity: Min: ${humidityDataSorted[0]}, Max: ${humidityDataSorted.at(-1)}`
  );
  // #4 --
  const dataSortedHottest = data.sort(
    (row1, row2) => row2.get(maxT) - row1.get(maxT)
  );
  console.log(
    `HottestDay: ${dataSortedHottest[0].get(date)} ${dataSortedHottest[0].get(
      city
    )}`
  );

  // #5 --
  const tempByCity = {};
  unicCities.forEach((element) => {
    tempByCity[element] = [];
  });
  data.forEach((row) => {
    tempByCity[row.get(city)].push(row.get(maxT));
  });
  let hottestCity = "";
  let hottestMeanT = -Infinity;
  for (const [cityName, Tarray] of Object.entries(tempByCity)) {
    const meanT = Tarray.reduce((sum, elem) => sum + elem) / Tarray.length;
    if (meanT > hottestMeanT) {
      hottestMeanT = meanT;
      hottestCity = cityName;
    }
  }

  console.log(`HottestCity: ${hottestCity}`);
  // END
}
