//---------------------
// VARIABLES DU PROGRAMME
const apiURL = "https://moviedb.preprod.myrole.fr/api/v1"

const searchParams = new URLSearchParams(window.location.search);
const movieId = searchParams.get("id");
//---------------------


// GÉNÈRE LE FORM
axios.get(`${apiURL}/movies/${movieId}`)
    .then(response => {
        const movie = response.data.data;
        const nameValue = movie.name;
        const authorValue = movie.author;
        const releaseYearValue = movie.releaseYear;
        const descriptionValue = movie.description;
        const imgValue = movie.img;
        const videoValue = movie.video;

        document.querySelector(".formulaire").innerHTML = `
                <div class="field">
                    <label for="name_input">Titre</label>
                    <input class="form_input" type="text" id="name" value="${nameValue}" required>
                </div>

                <div class="field">
                    <label for="author_input">Auteur</label>
                    <input class="form_input" type="text" id="author" value="${authorValue}" required>
                </div>

                <div class="field">
                    <label for="releaseYear_input">Année de parution</label>
                    <input class="form_input" type="number" id="releaseYear" value="${releaseYearValue}" required>    
                </div>

                <div class="field">
                    <label for="description_input">Description</label>
                    <input class="form_input" type="text" id="description" value="${descriptionValue}" required>
                </div>

                <div class="field">
                    <label for="img_input">Image</label>
                    <input class="form_input" type="url" id="img" value="${imgValue}" required>
                </div>

                <div class="field">
                    <label for="video_input">Vidéo</label>
                    <input class="form_input" type="url" id="video" value="${videoValue}" required>
                </div>
                `;
    })


// GÉNÈRE LES CATÉGORIES
axios.get(`${apiURL}/categories`)
    .then(response => {
        response.data.data.forEach((categorie) => {

            const createTag = document.createElement("div")
            createTag.classList.add("tag")
            createTag.dataset.id = categorie.id
            createTag.textContent = categorie.name

            document.querySelector(".tags").appendChild(createTag);

            createTag.addEventListener("click", (e) => {
                e.currentTarget.classList.toggle("selected")

                filmCategorie = [];

                document.querySelectorAll(".selected").forEach(element => {

                    filmCategorie.push(parseInt(element.dataset.id))
                })
                console.log(filmCategorie);
            });
        })
    })


// RÉCUPÈRE LE FORM PUIS PATCH
document.querySelector(".add_button").addEventListener("click", async function () {
    const filmTitle = document.getElementById("name").value
    const filmDirector = document.getElementById("author").value
    const filmPosterUrl = document.getElementById("img").value
    const filmSynopsis = document.getElementById("description").value
    const filmReleaseDate = document.getElementById("releaseYear").value
    const filmVideoUrl = document.getElementById("video").value

    await axios.patch(`${apiURL}/movies/${movieId}`, {
        name: filmTitle,
        author: filmDirector,
        img: filmPosterUrl,
        description: filmSynopsis,
        releaseYear: Number(filmReleaseDate),
        video: filmVideoUrl,
        likes: 0,
        dislikes: 0,
        categories: filmCategorie
    })
        .then(function (response) {
            window.location.href = `movie.html?id=${response.data.data.id}`;
        })
})