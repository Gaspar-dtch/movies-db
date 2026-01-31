//---------------------
// VARIABLES DU PROGRAMME
const apiURL = "https://moviedb.preprod.myrole.fr/api/v1"

let filmCategorie = []
//---------------------


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


// RÉCUPÈRE LE FORM PUIS POST
document.querySelector(".add_button").addEventListener("click", async function () {
    const filmTitle = document.getElementById("name").value
    const filmDirector = document.getElementById("author").value
    const filmPosterUrl = document.getElementById("img").value
    const filmSynopsis = document.getElementById("description").value
    const filmReleaseDate = document.getElementById("releaseYear").value
    const filmVideoUrl = document.getElementById("video").value

    await axios.post(`${apiURL}/movies`, {
        name: filmTitle,
        author: filmDirector,
        img: filmPosterUrl,
        description: filmSynopsis,
        releaseYear: Number(filmReleaseDate),
        video: filmVideoUrl,
        categories: filmCategorie
    })
        .then(function (response) {
            window.location.href = `movie.html?id=${response.data.data.id}`; // redirige vers la page créer
        })

})

document.querySelector(".add_btn_categorie").addEventListener("click", async function () {
    const filmDirector = document.getElementById("author").value

    await axios.post(`${apiURL}/categories`, {
        name: filmDirector,
    })
        .then(function () {
            window.location.href = "../index.html";
        })

})