//---------------------
// VARIABLES DU PROGRAMME
const apiURL = "https://moviedb.preprod.myrole.fr/api/v1"

let filmCategorie = []
//---------------------


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
        likes: 0,
        dislikes: 0,
        categories: filmCategorie
    })
        .then(function (response) {
            window.location.href = `movie.html?id=${response.data.data.id}`;
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


// DRAG
// const slider = document.querySelector(".tags");
// let isDown = false;
// let startX;
// let scrollLeft;

// slider.addEventListener("mousedown", (e) => {
//     isDown = true;
//     startX = e.pageX - slider.offsetLeft;
//     scrollLeft = slider.scrollLeft;
// });

// slider.addEventListener("mouseleave", () => {
//     isDown = false;
// });

// slider.addEventListener("mouseup", () => {
//     isDown = false;
// });

// slider.addEventListener("mousemove", (e) => {
//     if (!isDown) return;

//     e.preventDefault();
//     const x = e.pageX - slider.offsetLeft;
//     const walk = x - startX;
//     slider.scrollLeft = scrollLeft - walk;
// });