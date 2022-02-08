"use strict";// Pour vérifier et ne pas me tromper dans mes variables
let photographer

fetch("/data/photographers.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then((json) => {
        const photographers = json.photographers;
        let clickedName;
        //Récupération de l'Id via pathName/
        if(window.location.pathname === "/"){
            displayData(photographers);
        }

        document.querySelectorAll(".home-fig").forEach((figure) => {
            figure.addEventListener("click",function(){
                photographers.forEach((photographer) => {
                     //vérification si nom du phtographe =  au nom dans la balise "a" est identique
                    if(photographer.name === figure.firstElementChild.lastElementChild.innerHTML){
                        clickedName = photographer.name;
                        
                        //Enregistrement du nom dans le localStorage pour réutiliser lors de la récupération des média
                        localStorage.setItem("photographerName",clickedName);
                    }
                });
            });
        });
    }
);

async function displayData(photographers) {
    //intégration dans l'index html
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}