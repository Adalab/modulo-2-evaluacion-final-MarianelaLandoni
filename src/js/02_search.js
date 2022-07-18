'use strict';

//Función para pintar en el html la lista.
//Tengo que poner una variable vacía y luego ir recorriendo con un bucle para ir pintando dentro del array de anime.

function renderAnime() {
  let html = '';
  let classFavourite = '';
  for (const elementAnime of dataAnime) {
    const favouriteFoundIndex = favouritesAnime.findIndex(
      (fav) => elementAnime.mal_id === fav.mal_id
    );
    if (favouriteFoundIndex !== -1) {
      classFavourite = 'selected';
    } else {
      classFavourite = '';
    }
    if (
        elementAnime.images.jpg.image_url ===
        'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
      ) {
        html += `<li class=" js_eachAnime" id="${elementAnime.mal_id} ">
        <h3>${elementAnime.title}</h3>
        <img src='https://via.placeholder.com/210x295/ffffff/666666/?text=TV'>
        <i class="fa-solid fa-circle-xmark id="eliminateFav"></i>
        </li>`;
      } else {
        html += `<li class=" js_eachAnime" id="${elementAnime.mal_id} "><h3>${elementAnime.title}</h3><img src=${elementAnime.images.jpg.image_url}>
        <i class="fa-solid fa-circle-xmark id="eliminateFav"></i></li>`;
      }
  }

  listResults.innerHTML = html;
  listenerAnimes();
}

//Función para conseguir los datos del API

function getAnimeData() {
  const userInput = inputUser.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${userInput}`)
    .then((response) => response.json())
    .then((data) => {
      dataAnime = data.data;
      renderAnime(); //lo que va despues del . (.data)es lo que ponga en el API, aquí si vemos el JSON todos los datos están metidos dentro de "data"
    });
}

//Función manejadora del evento click de buscar

function handleClick(event) {
  event.preventDefault();
  getAnimeData();
}

//Evento para escuchar el evento click en el botón de buscar

btnSearch.addEventListener('click', handleClick);
