const viewFavoritesBtn = document.getElementById('viewFavoritesBtn');
const homeBtn = document.getElementById('homeBtn');

viewFavoritesBtn.addEventListener('click', () => {
    const favorites = getFavorites();
    displaySuperheroes(favorites, favoritesContainer);
    favoritesContainer.appendChild(superheroElement);
    // Show the favorites container and hide the main container
    favoritesContainer.classList.remove('hidden');
    container.classList.add('hidden');
});

// Function to handle "Home" button click
homeBtn.addEventListener('click', () => {
    // Reload the page to go back to the home screen
    location.reload();
});

// ...

//Add an event listener to go back to the main container
// document.addEventListener('DOMContentLoaded', () => {
//     container.classList.remove('hidden');
//     favoritesContainer.classList.add('hidden');
//     // Display the initial superheroes on the home page
//     // const initialSuperheroes = await fetchSuperheroes('Spider');
//     // displaySuperheroes(initialSuperheroes, container);
// });


function toggleFavorite(superhero) {
    const favorites = getFavorites();
    const isFavorite = favorites.some(fav => fav.id === superhero.id);

    if (isFavorite) {
        removeFavorite(superhero);
    } else {
        addFavorite(superhero);
    }

    // Refresh displays
    displaySuperheroes(getFavorites(), favoritesContainer);
    // displaySuperheroes([], container); // Clear the main container
}

// Function to get favorites from localStorage
function getFavorites() {
    const favoritesJSON = localStorage.getItem('favorites') || '[]';
    return JSON.parse(favoritesJSON);
}

// Function to add a superhero to favorites
function addFavorite(superhero) {
    const favorites = getFavorites();
    favorites.push(superhero);
    saveFavorites(favorites);
}

// Function to remove a superhero from favorites
function removeFavorite(superhero) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.id !== superhero.id);
    if(favorites==""){
        location.reload();
    };
    saveFavorites(favorites);
}
function saveFavorites(favorites) {
    const favoritesJSON = JSON.stringify(favorites);
    localStorage.setItem('favorites', favoritesJSON);
}
