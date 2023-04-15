// VARIABLES //
const FILENAME = "informations.txt"
//////////////


// FUNCTION //
function initSite() {
    // Recuperation des informations du fichier
    fetch(FILENAME)
    .then(response => response.json())
    .then(data => {
        // TODO appeler toutes les méthodes pour construire toutes les sections
        console.log("data", data);
    })
    .catch(error => {
        console.error('Erreur lors du chargement des données JSON', error);
    });
}

function buildProfil(profil){
    if(profil){

    }
}
//////////////

// EXECUTION //
initSite()

//////////////