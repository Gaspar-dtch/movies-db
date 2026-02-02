//---------------------
// VARIABLES DU PROGRAMME
const apiURL = "https://moviedb.preprod.myrole.fr/api/v1"

let filmCategorie = []
//---------------------


document.querySelector(".add_btn_categorie").addEventListener("click", async function () {
    const filmDirector = document.getElementById("author").value

    await axios.post(`${apiURL}/categories`, {
        name: filmDirector,
    })
        .then(function (response) {
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