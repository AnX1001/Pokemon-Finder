const rootUrl = "https://pokeapi.co/api/v2";

const input = document.querySelector(".inp-name");
input.oninput = fetchPokemon;
async function fetchPokemon() {
  let inputNameValue = input.value.toLowerCase();
  const pokemonName = inputNameValue;

  try {
    const endPoint = rootUrl + "/pokemon/" + pokemonName;
    const endPointResponse = await fetch(endPoint);
    const data = await endPointResponse.json();
    input.value = "";

    renderCard(data);
  } catch {
    console.log("no pokemon found");
  }
}

//render card for searched Pokemon

const cardImage = document.querySelector(".card-image");
const superPower = document.querySelector(".super-power");
const nameTitle = document.querySelector(".name");

function renderCard(data) {
  const power = data.abilities[1].ability.name;
  const artwork = data.sprites.other["official-artwork"].front_default;
  const speciesName = data.species.name;

  cardImage.style.backgroundImage = `url('${artwork}')`;
  nameTitle.innerText =
    `${speciesName}`.charAt(0).toUpperCase() + `${speciesName}`.slice(1);
  superPower.innerText =
    "Super Power: " + `${power}`.charAt(0).toUpperCase() + `${power}`.slice(1);

  //push to history script
  pushResultsToSearchCardArray(data);

  renderSearchedCards();
}
