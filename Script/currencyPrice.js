let yens = [];
let currency2021;
let currency2020;

fetchYen();
async function fetchYen(dataready) {
  try {
    const endPoint =
      "https://data.norges-bank.no/api/data/EXR/A.JPY.NOK.SP?format=sdmx-json&startPeriod=2019-01-01&endPeriod=2021-09-11&locale=no";
    const endPointResponse = await fetch(endPoint);
    const data = await endPointResponse.json();
    yens.push(data);

    viewCurrencies(dataready);
  } catch (e) {
    console.log(e);
  }
}

function viewCurrencies() {
  let currency2020 =
    yens[0].data.dataSets[0].series["0:0:0:0"].observations[0][0];

  let currency2021 =
    yens[0].data.dataSets[0].series["0:0:0:0"].observations[1][0];

  console.log(currency2020, currency2021);

  pokeballPrice2020.textContent =
    "Last Year: " +
    Math.round(currency2020 * 150).toLocaleString("en") +
    " NOK";
  pokeballPrice2021.textContent =
    "Today ONLY: " +
    Math.round(currency2021 * 150).toLocaleString("en") +
    " NOK !!";
}

const pokeballPrice2021 = document.querySelector(".pokeball-price-2021");
const pokeballPrice2020 = document.querySelector(".pokeball-price-2020");
