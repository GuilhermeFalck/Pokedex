const pokemonHeight = document.querySelector(".pokemon__height");
const pokemonWeight = document.querySelector(".pokemon__weight");
const pokemonName = document.querySelector(".pokemon__name");
const pokemonImg = document.querySelector(".pokemon__image");
const pokemonId = document.querySelector(".pokemon__number");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonId.innerHTML = "?";
  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML = data.id;
    pokemonImg.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    pokemonHeight.innerHTML = data.height;
    pokemonWeight.innerHTML = data.weight;
    searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = "Not found";
    pokemonId.innerHTML = "#";
    pokemonImg.src = "../imgs/poke.png";
    pokemonHeight.innerHTML = "?";
    pokemonWeight.innerHTML = "?";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
  input.value = "";
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  }
});

btnNext.addEventListener("click", () => {
  searchPokemon++;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
