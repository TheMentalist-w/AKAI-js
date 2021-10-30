/*
  1. W pliku data.js pod zmienna "pokemons" znajduje się tablica zawierająca dane wielu pokemonów, masz do niej dostęp również w tym pliku. 
  Chciałbym, abyś użył jej do wyświetlenia wszystkich pokemonów w naszym Pokedexie. 
  W tym celu dla każdego z nich możesz stworzyć nowy element drzeewa DOM i umieścić w nim informacje o Pokemonie (możesz zawrzeć tam jego nazwę, zdjęcie, a na kontener w którym się znajduje nadać specjalną klasę zależnie od typu)
*/

// tutaj złapiemy sekcję, do której będziemy dodawać pokemony
const pokemonsContainer = document.querySelector(".pokemons");

function renderPokemons(pokemons) {
    let pokemonList = pokemons.map( (pokemon) => {
      if (pokemon.types[1]) {
        return `<li class="card ${pokemon.types[0]} ${pokemon.types[1]}">` +
        `<img class="pokemonImage" src="${pokemon.image}" />` +
        `<h2 class="pokemonTitle"><span class="id">#${pokemon.id}</span> ${pokemon.name}</h2>` +
        `<h4 class="pokemonTypes">${pokemon.types[0]} ${pokemon.types[1]}</h4>` +
        `</li>`
      } else {
        return `<li class="card ${pokemon.types[0]}">` +
        `<img class="pokemonImage" src="${pokemon.image}" />` +
        `<h2 class="pokemonTitle"><span class="id">#${pokemon.id}</span> ${pokemon.name}</h2>` +
        `<h4 class="pokemonTypes">${pokemon.types[0]}</h4>` +
        `</li>`
      }
    }).join("")
  pokemonsContainer.innerHTML = pokemonList
}

 renderPokemons(pokemons);

/*
  2. Przeglądanie całej listy pokemonów może okazać się trochę uciążliwe. Fajnie byłoby skorzystać z filtrów, które już znajdują sie w pliku html. 
  Napisz ciało funkcji które pozwoli nam na:
  - filtrowanie po typie
  - filtrowanie po nazwie (wpisany fragment zawiera się w nazwie pokemona)
*/

function filterPokemons(pokemons) {
  let checkboxes = document.querySelectorAll('input[type=checkbox]')
  let keyWord = document.querySelectorAll('input[type=text]')
  let checkedTypes = []
  let input = keyWord[0]
  let filter = input.value.toUpperCase()
  let li = document.getElementsByTagName('li')
  
  checkboxes.forEach(checkbox => { if (checkbox.checked) checkedTypes.push(checkbox.id) })

  for (let i = 0; i < li.length; i++) {
    let h2 = li[i].getElementsByTagName('h2')[0]
    if (h2) {
      let txtValue = h2.textContent || h2.innerText
	  let n = 0
	  li[i].className.split(' ').forEach(type => {if (checkedTypes.indexOf(type) !== -1) n += 1})
      if ((txtValue.toUpperCase().indexOf(filter) > -1) && (n > 0)) {
        li[i].style.display = ''
      } else {
		li[i].style.display = 'none'
	  }
    }
  }
}

const form = document.querySelector("form");

function submitForm(event) {
  event.preventDefault();
  filterPokemons(pokemons);
}

form.addEventListener("submit", submitForm);

/*
  3. Pokedex powinien wyglądać trochę lepiej, niż ten tutaj. W folderze znajdziesz plik style.css, w którym możesz ulepszyć wygląd naszego pokedexa
  Liczymy na Twoją kreatywność 😉
*/
