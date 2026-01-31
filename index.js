//---------------------
// VARIABLES DU PROGRAMME
const apiURL = "https://moviedb.preprod.myrole.fr/api/v1"

const gridContainer = document.getElementById("grid");
const searchInput = document.getElementById("search_input")
const searchEmpty = document.querySelector(".search-empty")
const tagsContainer = document.querySelector(".tags");

let allMovies = []
let filmCategorie = []

let selectedCategories = []
let searchValue = ""
//---------------------


function createListItems(data) {
    let html = ""
    data.forEach(movie => { // pour chaque film ça génère une card
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
}


axios.get(`${apiURL}/movies`)
    .then(response => {

        allMovies = response.data.data // récupère tout les film et les stocke dans allMovies

        createListItems(allMovies) // appel la fonction createListItems avec tout les films

        searchInput.addEventListener("input", (e) => {
            searchEmpty.style.display = "none"; // cache le message "pas de résultat" à chaque input

            const currentValue = e.target.value // récupère la valeur actuel dans l'input et le stocke dans currentValue
            gridContainer.innerHTML = "" // à chaque inpput remet le contenue vide
            const dataFilter = allMovies.filter(movie => movie.name.toLowerCase().includes(currentValue.toLowerCase()) ||
                movie.author.toLowerCase().includes(currentValue.toLowerCase()))
            //  || movie.description.toLowerCase().includes(currentValue.toLowerCase())) // filtre la liste de tout les films, compare le nom des films en minuscule avec la valeur dans l'input en minuscule et les stocke dans dataFilter

            if (dataFilter.length === 0) { // si il n'y a pas de film dans dataFilter alors afficher le message "pas de résultat"

                searchEmpty.style.display = "flex";
            }

            createListItems(dataFilter)
        })
    })


// GÉNÈRE LES CATÉGORIES
axios.get(`${apiURL}/categories`)
    .then(response => {
        response.data.data.forEach((categorie) => {

            const createTag = document.createElement("div") // créer une div
            createTag.classList.add("tag") // ajoute la class tag
            createTag.dataset.id = categorie.id // ajout dataset avec son id
            createTag.textContent = categorie.name

            document.querySelector(".tags").appendChild(createTag); // ajoute les tags créer dans la div tags

            createTag.addEventListener("click", (e) => {
                e.currentTarget.classList.toggle("selected") // toggle la class selected

                filmCategorie = []; // réinitialise le tableau à chaque tag selected

                document.querySelectorAll(".selected").forEach(element => {
                    filmCategorie.push(parseInt(element.dataset.id)) // converti l'id en nombre et l'ajoute dans le tableau avec push
                })
            });
        })
    })





// FILTRE

// comparé l'id des catégorie du film avec celle "selected"


// const sectionChars = document.querySelector('.personnages').closest('section');
// const checkboxesChar = sectionChars.querySelectorAll('input[type="checkbox"]');
// const characters = document.querySelectorAll('.personnages a');

// checkboxesChar.forEach(checkbox => {
//     checkbox.addEventListener('change', () => {
//         const activeElements = [...checkboxesChar]
//             .filter(cb => cb.checked)
//             .map(cb => cb.id);

//         if (activeElements.length === 0) {
//             characters.forEach(char => char.style.display = 'flex');
//             return;
//         }

//         characters.forEach(char => {
//             const hasMatch = activeElements.some(el => char.classList.contains(el));
//             char.style.display = hasMatch ? 'flex' : 'none';
//         });
//     });
// });
