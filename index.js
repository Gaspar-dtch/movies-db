//---------------------
// VARIABLES DU PROGRAMME
const apiURL = "https://moviedb.preprod.myrole.fr/api/v1/movies"

const gridContainer = document.getElementById("grid");
const searchInput = document.getElementById("search_input")
const searchEmpty = document.querySelector(".search-empty")
//---------------------


axios.get(`${apiURL}`)
    .then(response => {

        const allMovies = response.data.data // récupère tout les film et les stocke dans allMovies

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

        createListItems(allMovies) // créer une liste items contenant tout les films

        searchInput.addEventListener("input", (e) => {
            searchEmpty.style.display = "none"; // cache le message "pas de résultat" à chaque input

            const currentValue = e.target.value // récupère la valeur actuel dans l'input et le stocke dans currentValue
            gridContainer.innerHTML = "" // à chaque inpput remet le contenue vide
            const dataFilter = allMovies.filter(movie => movie.name.toLowerCase().includes(currentValue.toLowerCase()) ||
                movie.author.toLowerCase().includes(currentValue.toLowerCase()) ||
                movie.description.toLowerCase().includes(currentValue.toLowerCase())) // filtre la liste de tout les films, compare le nom des films en minuscule avec la valeur dans l'input en minuscule et les stocke dans dataFilter

            if (dataFilter.length === 0) { // si il n'y a pas de film dans dataFilter alors afficher le message "pas de résultat"
                
                searchEmpty.style.display = "flex";
            }
            
            createListItems(dataFilter)
        })
    })

