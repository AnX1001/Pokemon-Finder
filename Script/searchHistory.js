//Create elements and append to body
const historyList = document.querySelector(".history-list");

function renderSearchedCards() {
  const searchedCard = document.createElement("div");
  const searchedCardImage = document.createElement("img");
  const searchedCardName = document.createElement("h3");

  historyList.appendChild(searchedCard);
  searchedCard.appendChild(searchedCardImage);
  searchedCard.appendChild(searchedCardName);

  //Assign searchedCard class and style created elements
  searchedCard.setAttribute("class", "searched-card");

  searchedCard.style.cssText = `
width: fit-content;
display: grid; 
justify-items: center;
padding: 8px;
margin: 8px;
height: 160px;
background: greenyellow;
border: 3px solid black;


`;

  searchedCardImage.style.cssText = `
width: 110px; 
height: 110px; 
object-fit: cover;
padding: 5px;
border-radius: inherit;
`;

  drawSearchedCardContent();

  function drawSearchedCardContent() {
    if ((searchedCardName.innerText = searchedCardArray.name[1])) {
      searchedCardImage.src = searchedCardArray.imageUrl[0];
      searchedCardName.innerText =
        searchedCardArray.name[0].charAt(0).toUpperCase() +
        searchedCardArray.name[0].slice(1);

      let randomColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
      searchedCard.style.setProperty("background", randomColor);
    } else {
      searchedCardImage.src = searchedCardArray.imageUrl[0];
      searchedCardName.innerText =
        searchedCardArray.name[0].charAt(0).toUpperCase() +
        searchedCardArray.name[0].slice(1);
    }
  }

  const allDoms = document.querySelectorAll(".searched-card");
  console.log(allDoms);

  for (let i = 0; i < allDoms.length; i++) {
    allDoms[i].onclick = (e) => {
      let clickedSearchedPokeMonName = e.currentTarget
        .querySelector("h3")
        .innerText.toLowerCase();
      console.log(clickedSearchedPokeMonName + "1823123");

      fetchSearchedPokemon();
      async function fetchSearchedPokemon() {
        const searchedName = clickedSearchedPokeMonName;

        try {
          const endPoint = rootUrl + "/pokemon/" + searchedName;
          const endPointResponse = await fetch(endPoint);
          const data = await endPointResponse.json();
          input.value = "";

          const power = data.abilities[1].ability.name;
          const artwork = data.sprites.other["official-artwork"].front_default;
          const speciesName = data.species.name;

          cardImage.style.backgroundImage = `url('${artwork}')`;
          nameTitle.innerText = `${speciesName}`;
          superPower.innerText = `${power}`;
        } catch {
          console.log("no pokemon found");
        }
      }
    };
  }
}

const searchedCardArray = {
  imageUrl: [],
  name: [],
  historyIndex: [],
};

let historyIndex = 0;

function pushResultsToSearchCardArray(data) {
  searchedCardArray.name.unshift(data.species.name);
  searchedCardArray.imageUrl.unshift(
    data.sprites.other["official-artwork"].front_default
  );
  searchedCardArray.historyIndex.push(historyIndex++);
  console.log(searchedCardArray);
}
