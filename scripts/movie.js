//---------------------
// VARIABLES DU PROGRAMME
const searchParams = new URLSearchParams(window.location.search);
const movieId = searchParams.get("id");

const apiURL = "https://moviedb.preprod.myrole.fr/api/v1/movies"

const buttonYes = document.getElementById("button_yes");
const buttonNo = document.getElementById("button_no");
const delPanel = document.getElementById("del_panel");
const like = document.querySelector(".like");
const likeCounter = document.querySelector(".like_counter");
const dislike = document.querySelector(".dislike");
const editButton = document.querySelector(".edit_button");
//---------------------


axios.get(`${apiURL}/${movieId}`)
    .then(response => {
        const movie = response.data.data;
        let video = response.data.data.video;
        let videoMovie = video.slice(32)

        const categoriesHTML = movie.categories
            .map(cat => `<span class="category">${cat.name}</span>`)
            .join("");

        document.querySelector(".movie-video").innerHTML = `
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoMovie}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        `;

        document.querySelector(".movie-info").innerHTML = `
            <div class="fiche_container">
                <div class="poster">
                    <img class="affiche" src="${movie.img}" alt="Affiche">
                </div>

                <div class="texte">
                    <h1>${movie.name}</h1>

                    <p><span class="title">Réalisateur : </span>${movie.author}</p>
                    <p><span class="title">Année de parution : </span>${movie.releaseYear}</p>
                    <p><span class="title">Description : </span>${movie.description}</p>
                    <p>${categoriesHTML}</p>

                    <p class="like"><img class="like_counter" src="../images/like_2.svg" alt="Like">${movie.likes}</p>

                    <p class="dislike"><img class="dislike_counter" src="../images/dislike_2.svg" alt="Dislike">${movie.dislikes}</p>
                    
                    <div class="buttons">
                        <a class="btn" href="addMovie.html" title="Ajouter"><span class="add-icon"></span></a>
                        <a class="btn" href="editMovie.html?id=${movie.id}" title="Modifier"><span class="edit-icon"></span></a>
                        <button class="del-btn" title="Supprimer"><span class="trash-icon"></span></button>
                    </div>
                </div>
            </div>
            `;

        // LIKE
        document.body.addEventListener("click", async (e) => {
            if (!e.target.classList.contains("like_counter")) { return };

            const key = `like_movie_${movie.id}`

            if (localStorage.getItem(key) === "1") { return }

            localStorage.setItem(key, "1")
            e.target.classList.add("liked")

            await axios.patch(`${apiURL}/${movieId}/like`)
        })

        // DISLIKE
        document.body.addEventListener("click", async (e) => {
            if (!e.target.classList.contains("dislike_counter")) { return };

            const key = `dislike_movie_${movie.id}`

            if (localStorage.getItem(key) === "1") { return }

            localStorage.setItem(key, "1")
            e.target.classList.add("disliked")

            await axios.patch(`${apiURL}/${movieId}/dislike`)
        })
    })


// PANNEAU DELETE
document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("del-btn")) {
        delPanel.style.display = "flex";  
    }
    if (e.target.classList.contains("trash-icon")) {
        delPanel.style.display = "flex";  
    }
})

// BOUTON YES
buttonYes.addEventListener("click", async function () {
    await axios.delete(`${apiURL}/${movieId}`)
    window.location.href = "../index.html";
});

// BOUTON NO
buttonNo.addEventListener("click", function () {
    delPanel.style.display = "none";
});





// document.body.addEventListener("click", async (e) => {
//     if (e.target.classList.contains("del_button")) {
//         await axios.delete(`${apiURL}/${movieId}`)
//         window.location.href = "../index.html";
//     }
// })