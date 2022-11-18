let offset = 0;
const limit = 10;
const maxShow = 151;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
const pokemonList = document.getElementById("pokemonList");
const btn = document.getElementById("loadMoreButton");

function pokemonToLi(pokemon) {
  return `<li class="pokemon ${pokemon.type}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types
                          .map((type) => `<li class="type">${type}</li>`)
                          .join("")}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}"/>
                </div>
            </li>`;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    // pokemonList.innerHTML += pokemons.map(pokemonToLi).join(''); //simples demais até pra entender.

    const newList = pokemons.map((pokemon) => pokemonToLi(pokemon));
    const addHtml = newList.join("");
    pokemonList.innerHTML += addHtml;
  });
}

loadPokemonItens(offset, limit);

btn.addEventListener("click", () => {
  offset += limit;
  let nextPokemons = offset + limit;

  if (nextPokemons >= maxShow) {
    const newLimit = maxShow - offset;
    loadPokemonItens(offset, newLimit);

    btn.parentElement.removeChild(btn);
  } else {
    loadPokemonItens(offset, limit);
  }
});
