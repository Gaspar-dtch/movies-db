//---------------------
// VARIABLES DU PROGRAMME
const apiURL = "https://moviedb.preprod.myrole.fr/api/v1/movies"

const gridContainer = document.getElementById("grid");
const searchInput = document.getElementById("search_input")
const searchEmpty = document.querySelector(".search-empty")
//---------------------


axios.get(`${apiURL}`)
    .then(response => {

        const allMovies = response.data.data

        function createListItems(data) {

            let html = ""
            data.forEach(movie => {
                html += `
                    <a class="card" href="scripts/movie.html?id=${movie.id}">
                        <img class="poster" src="${movie.img}" alt="Affiche ${movie.name}">
                       <h2 class="name">${movie.name}</h2>
                        <h3 class="author">${movie.author}</h3>
                        <p class="description">${movie.description.slice(0, 200) + "..."}</p>
                    </a>
                `
            });
            gridContainer.innerHTML = html
        }

        
        

        createListItems(allMovies)

        searchInput.addEventListener("input", (e) => {
            searchEmpty.style.display = "none";

            const currentValue = e.target.value
            gridContainer.innerHTML = ""
            const dataFilter = allMovies.filter(movie => movie.name.toLowerCase().includes(currentValue.toLowerCase()) ||
                movie.author.toLowerCase().includes(currentValue.toLowerCase()) ||
                movie.description.toLowerCase().includes(currentValue.toLowerCase()))

            if (dataFilter.length === 0) {
                
                searchEmpty.style.display = "flex";
            }
            
            createListItems(dataFilter)
        })
    })

