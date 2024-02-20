const container = document.getElementById('superheroContainer');
const searchinput = document.getElementById('searchInput');
const favoritesContainer = document.getElementById('favoritesContainer');



// let date = new Date();
// console.log(date.getTime());

const [timestamp,apikey,hashValue] = [ts,publickey,hashVal];

// const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}&name=${input.value}`;
const url = 'https://gateway.marvel.com:443/v1/public/characters';

// async function fetchSuperheroes() {
//     let response = await fetch(url);
//     let data = await response.json();
//     return data.data.results;
// }
async function fetchSuperheroes(nameStartsWith) {
    const ts = new Date().getTime();
    // const hash = "101e5056124277ea429f788658f3d36a";
    //const url = `${url}?nameStartsWith=${nameStartsWith}&ts=${ts}&apikey=${publickey}&hash=${hashVal}`;
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}&nameStartsWith=${nameStartsWith}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;

}


function displaySuperheroes(superheroes) {
    container.innerHTML = '';
    superheroes.forEach(superhero => {
        const superheroElement = document.createElement('div');
        superheroElement.classList.add('superhero');

        const favoriteIcon = document.createElement('span');
        favoriteIcon.classList.add('favorite-icon');
        favoriteIcon.innerHTML = '❤️';

        const name = document.createElement('h2');
        name.textContent = superhero.name;

        const comics = document.createElement('p');
        comics.textContent = `Comics: ${superhero.comics.available}`;

        const stories = document.createElement('p');
        stories.textContent = `Stories: ${superhero.stories.available}`;

        const events = document.createElement('p');
        events.textContent = `Events: ${superhero.events.available}`;

        const series = document.createElement('p');
        series.textContent = `Series: ${superhero.series.available}`;

        const image = document.createElement('img');
        image.src = `${superhero.thumbnail.path}/portrait_xlarge.${superhero.thumbnail.extension}`;
        image.alt = superhero.name;

        superheroElement.appendChild(favoriteIcon);
        superheroElement.appendChild(name);
        superheroElement.appendChild(comics);
        superheroElement.appendChild(stories);
        superheroElement.appendChild(events);
        superheroElement.appendChild(series);
        superheroElement.appendChild(image);

       container.appendChild(superheroElement);

        favoriteIcon.addEventListener('click', () => {
            toggleFavorite(superhero);
        });
    });
}

async function handleSearch() {
    const searchTerm = searchinput.value.trim();
    if (searchTerm !== '') {
        const superheroes = await fetchSuperheroes(searchTerm);
        displaySuperheroes(superheroes, container);
    }
}

searchinput.addEventListener('input', handleSearch);

// window.onload = async () => {
//     const initialSuperheroes = await fetchSuperheroes('Spider');
//     displaySuperheroes(initialSuperheroes, container);
//     displaySuperheroes(getFavorites(), favoritesContainer);
// };

// Function to handle search input
// async function handleSearch() {
//     const searchTerm = searchInput.value.trim();
//     if (searchTerm !== '') {
//         const superheroes = await fetchSuperheroes(searchTerm);
//         displaySuperheroes(superheroes);
//     }
// }

// Add event listener to search input
// searchInput.addEventListener('input', handleSearch);

//Initial load 
window.onload = async () => {
    const initialSuperheroes = await fetchSuperheroes('Iron Man');
    displaySuperheroes(initialSuperheroes,container);
};
