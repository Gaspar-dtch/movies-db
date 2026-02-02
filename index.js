//---------------------
// VARIABLES DU PROGRAMME
const apiURL = "https://moviedb.preprod.myrole.fr/api/v1"

const gridContainer = document.getElementById("grid");
const searchInput = document.getElementById("search_input")
const searchEmpty = document.querySelector(".search-empty")
const tagsContainer = document.querySelector(".tags");

let allMovies = []
let selectedCategories = []
let searchValue = ""
//---------------------


function createListItems(movies) {
    let html = ""
    movies.forEach(movie => { // pour chaque film ça génère une card
        html += `
                    <a class="card" href="scripts/movie.html?id=${movie.id}">
                        <img class="poster" src="${movie.img}" alt="Affiche ${movie.name}">
                       <h2 class="name">${movie.name}</h2>
                        <h3 class="author">${movie.author}</h3>
                        <p class="description">${movie.description.slice(0, 200) + "..."}</p>
                    </a>
                `
    });
    gridContainer.innerHTML = html // innerHTML de toute les cards dans gridContainer

    console.log("Nombre de film trouvé : ", movies.length);

    if (movies.length === 0) { // vérifie si aucun film apparait
        searchEmpty.style.display = "flex"; // si vide, affiche le message "pas de résultat"
    } else {
        searchEmpty.style.display = "none"; // sinon le cache
    }
}


function filterMovies() {
    const filter = allMovies.filter(movie => {

        const matchSearch = movie.name.toLowerCase().includes(searchValue.toLowerCase()) // compare le nom des films en minuscule avec la valeur dans l'input en minuscule et renvoie true ou false
            || movie.author.toLowerCase().includes(searchValue.toLowerCase())
            || movie.description.toLowerCase().includes(searchValue.toLowerCase())

        let matchCategories

        if (selectedCategories.length === 0) {
            matchCategories = true // si pas de catégorie selected alors true
        } else {
            matchCategories = movie.categories.some(caté => selectedCategories.includes(caté.id)) // sinon renvoie false
        }

        return matchSearch && matchCategories
    })

    createListItems(filter)
}

// BARRE DE RECHERCHE
searchInput.addEventListener("input", (e) => {
    searchValue = e.target.value // récupère la valeur actuel dans l'input et le stock dans searchValue

    filterMovies()
})

// RÉCUPÈRE LES FILMS
axios.get(`${apiURL}/movies`)
    .then(response => {
        allMovies = response.data.data // récupère tout les film et les stocke dans allMovies

        createListItems(allMovies) // appel la fonction createListItems avec tout les films
    })


// GÉNÈRE LES CATÉGORIES
axios.get(`${apiURL}/categories`)
    .then(response => {
        response.data.data.forEach((categorie) => {

            const tag = document.createElement("div") // créer une div
            tag.classList.add("tag") // ajoute la class tag
            tag.dataset.id = categorie.id // ajout dataset avec son id
            tag.textContent = categorie.name


            tag.addEventListener("click", () => {
                tag.classList.toggle("selected") // toggle la class selected

                selectedCategories = []; // réinitialise le tableau à chaque tag selected

                document.querySelectorAll(".tag.selected").forEach(element => {
                    selectedCategories.push(parseInt(element.dataset.id)) // converti l'id en nombre et l'ajoute dans le tableau avec push
                })

                filterMovies()
            });
            document.querySelector(".tags").appendChild(tag); // ajoute les tags créer dans la div tags
        })
    })
