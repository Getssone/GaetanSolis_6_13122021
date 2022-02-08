"use strict";
fetch("./data/photographers.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then((json) => {
        const photographers = json.photographers;
        const media = json.media;
        let photos = [];

        //Utilisation du photographe actuel
        let photographer;
        var photographerName = localStorage.getItem("photographerName");
        photographers.forEach((thisphotographer) => {
            if(thisphotographer.name === photographerName){
                photographer = thisphotographer;
            }
        });
       //Récupération des photos du photographe 
        media.forEach((photo) => {
            if(photo.photographerId === photographer.id){
                photos.push(photo);
            }
        })
        //Calcule le total de Likes
        let totalLikes;
        function calcTotalLikes(){
            totalLikes = 0
            photos.forEach((photo) => {
                totalLikes += photo.likes;
            });
            localStorage.setItem("totalLikes",totalLikes);
        }
        calcTotalLikes();

         //Ajoute les entête et le tolal de like
        async function displayData() {
            const photographerModel = photographerFactory(photographer);
            const photographersSection = document.querySelector(".gallery_section");
            //Ajout de l'entête
            const headerDOM = photographerModel.getHeaderDom();
            document.querySelector(".photograph-header").replaceWith(headerDOM);
            //ajout du selecteur
            const selectDOM = photographerModel.getSelectDOM();
            photographersSection.insertAdjacentElement("afterbegin",selectDOM);
            //Ajout de likes
            const totalLikesDOM = photographerModel.getTotalLikesDOM();
            photographersSection.lastElementChild.insertAdjacentElement("afterend",totalLikesDOM);
            //Ajout du modal Contact
            const contactModalDOM = photographerModel.getContactModalDOM();
            document.getElementById("main" ).insertAdjacentElement("afterend",contactModalDOM);
            //ajout du modal Lightbox
            const lightboxModalDom = photographerModel.getLightboxDOM();
            document.getElementById("contactModal").insertAdjacentElement("afterend",lightboxModalDom);
        }
        //Supprime puis ajoute toutes les figures de la galerie avec les likes
        function refreshallery(){
            const photographersSection = document.querySelector(".gallery_section");
            while(document.querySelector(".personal-fig")){
                document.querySelector(".personal-fig").remove();
            }
            photos.forEach((photo) => {
                let photographerModel = photographerFactory(photo);
                const userCardDOM = photographerModel.getGalleryDom();
                photographersSection.appendChild(userCardDOM);
                let likedDOM = userCardDOM.lastElementChild.firstElementChild.nextElementSibling;
                let heartButtonDOM = userCardDOM.lastElementChild.lastElementChild;
                let heartIconDOM = heartButtonDOM.firstElementChild;
                let totalLikesDOM = document.getElementById("likes-total");
                calcTotalLikes();
                totalLikesDOM.innerHTML = totalLikes;

                //bascule les likes "icone" vers like "total"
                heartButtonDOM.addEventListener("click",function(){
                    if(parseInt(likedDOM.innerHTML) === photo.likes){
                        likedDOM.innerHTML = photo.likes + 1;
                        heartIconDOM.setAttribute("class","fas fa-heart primary");
                        totalLikesDOM.innerHTML = totalLikes += 1;
                        heartButtonDOM.setAttribute("aria-label","Remove like");
                    }
                    else{
                        likedDOM.innerHTML = photo.likes;
                        heartIconDOM.setAttribute("class","far fa-heart primary");
                        totalLikesDOM.innerHTML = totalLikes -= 1;
                        heartButtonDOM.setAttribute("aria-label","Add Like")
                    }
                });
            });
        }
        
        //trie par like
        function SortByLikes() {
            photos.sort((a, b) => {
                return b.likes - a.likes;
            });
        }

        if(window.location.pathname === "/photographe.html"){

            SortByLikes();
            displayData();
            refreshallery();
            modalFunction();
            lightboxFunction();

            //Trie
            document.getElementById("select-sort").addEventListener('change', function() {
                //Trie par popularité
                if (document.getElementById("select-sort").selectedIndex === 0) {
                    SortByLikes();
                }
                //Trie par date
                if (document.getElementById("select-sort").selectedIndex === 1) {
                    photos.sort((a, b) => {
                        return a.date.replaceAll("-", "") - b.date.replaceAll("-", "");
                    });
                }
                //Trie par nom
                if (document.getElementById("select-sort").selectedIndex === 2) {
                    photos.sort((a, b) => {
                        //A -> Z Pourquoi le -1
                        if (a.title < b.title) {
                            return -1;
                        }
                        //Z -> A
                        if (a.title > b.title) {
                            return 1;
                        }
                        return 0;
                    });
                }
                refreshallery();
            });
        }
    }
);
