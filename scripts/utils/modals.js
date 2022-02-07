function validateInput(input,label,regex,boolean,error){
    input = document.getElementById(input);
    label = document.getElementById(label);
    if(! input.value.match(regex)){
        label.style.color = "red";
        boolean= 0;
        input.setAttribute("aria-invalid",error);
        input.setAttribute("aria-label",error);
    }
    else{
        label.style.color = "black";
        boolean=1;
        input.setAttribute("aria-invalid","");
        input.setAttribute("aria-label","");
    }
    return boolean;
}
function modalFunction(){
    let validateBool = 0;
    let wordPattern = /[A-zà áâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'--]{2,}/gim;
    let mailPattern = /[A-z0-9@._-]{2,}@+/gmi;
    document.getElementById("contactForm").addEventListener("submit", function(e) {

        validateBool = validateInput("fname"  ,"fnamelabel",wordPattern,validateBool,"Error, invalid first name");
        validateBool = validateInput("lname"  ,"lnamelabel",wordPattern,validateBool,"Error, invalid last name");
        validateBool = validateInput("email"  ,"emaillabel",mailPattern,validateBool,"Error, invalid email");
        validateBool = validateInput("message","messagelabel",wordPattern,validateBool,"Error, invalid message");
        document.getElementById("email").setAttribute("type","email");

        //vérification valide
        if(validateBool){
            console.log("Prénom : " + document.getElementById("fname").value + " Nom : " + document.getElementById("lname").value + " Email : " + document.getElementById("email").value + " Message : " + document.getElementById("message").value);
            document.getElementById("submitButton").setAttribute("aria-label","")
            document.getElementById("submitButton").style.backgroundColor = "#0d6efd"
            document.getElementById("contactModal").style.display = 'none';
            debugger
            form.reset()
            
        }
        //vérification invalide
        if(!validateBool){
            document.getElementById("submitButton").setAttribute("aria-label","Invalid inputs, cannot submit")
            document.getElementById("submitButton").style.backgroundColor = "red"
        }
        

        e.preventDefault();
        
    });
}
// Fermer le formulaire avec le message de validation



function lightboxFunction(){
    
    const MODALLB = new bootstrap.Modal(document.getElementById("modal-lb"), {keyboard: false});
    const imageLink = Array.from(document.getElementsByClassName("button-img"));
    const medias = Array.from(document.getElementsByClassName("media"));
    const leftButton  = document.getElementById("button-left-lb");
    const rightButton = document.getElementById("button-right-lb");
    for(let i = 0 ; i < imageLink.length;i++){
        imageLink[i].addEventListener("click",function(e){
            let clickedID = i;
            //cloneNode difficile a  comprendre malgrés que mon ancien mentor me l'ai fait intégré
            let media = medias[i].cloneNode();
            media.setAttribute("class",'col-10');
            media.setAttribute("tabindex","0");
            if(leftButton.nextElementSibling.nodeName != "BUTTON"){
                leftButton.nextElementSibling.remove();
            }
            leftButton.insertAdjacentElement("afterend",media);
            MODALLB.show();
            rightButton.addEventListener("click",function(){
                clickedID+=1
                if(clickedID > medias.length-1){
                    clickedID = 0;
                }
                media = medias[clickedID].cloneNode();
                media.setAttribute("class",'col-10');
                media.setAttribute("tabindex","0");
                if(leftButton.nextElementSibling){
                    leftButton.nextElementSibling.remove();
                }
                leftButton.insertAdjacentElement("afterend",media);
            })
            leftButton.addEventListener("click",function(){
                clickedID-=1
                if(clickedID < 0){
                    clickedID = medias.length-1;
                }
                media = medias[clickedID].cloneNode();
                media.setAttribute("class",'col-10');
                media.setAttribute("tabindex","0");
                if(leftButton.nextElementSibling){
                    leftButton.nextElementSibling.remove();
                }
                leftButton.insertAdjacentElement("afterend",media);
            })
            document.body.addEventListener("keydown", function(event) {
                //Fermeture du Modal si on utilise le clavier "échap" 
                if (event.key === "Escape"){
                    MODALLB.hide();
                }
                if (event.key === "ArrowRight"){
                        clickedID+=1
                    if(clickedID > medias.length-1){
                        clickedID = 0;
                    }
                    media = medias[clickedID].cloneNode();
                    media.setAttribute("class",'col-10');
                    media.setAttribute("tabindex","0");
                    if(leftButton.nextElementSibling){
                        leftButton.nextElementSibling.remove();
                    }
                    leftButton.insertAdjacentElement("afterend",media);
                }
                if (event.key === "ArrowLeft"){
                    clickedID-=1
                    if(clickedID < 0){
                        clickedID = medias.length-1;
                    }
                    media = medias[clickedID].cloneNode();
                    media.setAttribute("class",'col-10');
                    media.setAttribute("tabindex","0");
                    if(leftButton.nextElementSibling){
                        leftButton.nextElementSibling.remove();
                    }
                    leftButton.insertAdjacentElement("afterend",media);
                }
            })
        })
    }
    document.getElementById("button-close-lb").addEventListener("click",function(){
        MODALLB.hide()
    })
}
function openLb(clickedID) {
    //Supprime les ancien médias si de nouveau son ajouté
    if (document.getElementById("img-lb")) {
        document.getElementById("img-lb").remove();
    }
    //Ajout des images si un tableau est crée
    if (arrayPhotos[clickedID].image) {
        //factory.makeDom difficile a  comprendre malgrés que mon ancien mentor me l'ai fait intégré
        let image = factory.makeDom("img","lb",clickedID);
        document.getElementById("button-left-lb").insertAdjacentHTML("afterend", image.dom);
    //Ajout des vidéos si un tableau est crée
    } else {
        let video = factory.makeDom("vid","lb",clickedID);
        document.getElementById("button-left-lb").insertAdjacentHTML("afterend", video.dom);
    }
}