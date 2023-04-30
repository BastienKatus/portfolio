// VARIABLES //
const FILENAME = "informations.txt"
//////////////


// FUNCTION //
function initSite() {
    // Recuperation des informations du fichier
    fetch(FILENAME)
    .then(response => response.json())
    .then(data => {
        // PROFIL
        try{
            let profil = data["profil"]
            buildProfil(profil)
        }
        catch(profilError){
            console.log("Erreur lors du chargement du profile")
        }

        // FORMATIONS
        try{
            let formations = data["formations"]
            buildFormations(formations)
        }
        catch(formationsError){
            console.log("Erreur lors du chargement des formations", formationsError)
        }

        // COMPETENCES
        try{
            let competences = data["competences"]
            buildCompetences(competences)
        }
        catch(competencesError){
            console.log("Erreur lors du chargement des compétences", competencesError)
        }

        // EXPERIENCES
        try{
            let experiences = data["experiences_professionnelles"]
            buildExperiences(experiences)
        }
        catch(experiencesError){
            console.log("Erreur lors du chargement des expériences professionnel", experiencesError)
        }

        // PROJETS UNIVERSITAIRES
        try {
            let projets = data["projets_universitaires"];
            buildProjets(projets);
        } catch (projetsError) {
            console.log("Erreur lors du chargement des projets universitaires");
        }
    })
    .catch(error => {
        console.error('Erreur lors du chargement des données JSON', error);
    });
}

function buildProfil(profil){
    if(profil){
        // Récupération des données
        let lastName = profil["nom"];
        let firstName = profil["prenom"];
        let birthDay = new Date(profil["date_naissance"]);
        let age = Math.floor((new Date() - birthDay) / (365.25 * 24 * 60 * 60 * 1000));
        let nationality = profil["nationalite"];
        let address1 = profil["adresse1"];
        let address2 = profil["adresse2"];
        let phone = profil["telephone"];
        let mail = profil["email"];

        // Sélection de tous les éléments avec la classe "profil-info"
        let profilInfos = document.querySelectorAll(".profil-info");
        profilInfos.forEach(function(profilInfo) {
            // Ajout du contenu correspondant à chaque élément
            switch(profilInfo.id) {
                case "lastname":
                    profilInfo.innerHTML = lastName;
                    break;
                case "firstname":
                    profilInfo.innerHTML = firstName;
                    break;
                case "age":
                    profilInfo.innerHTML = age;
                    break;
                case "nationality":
                    profilInfo.innerHTML = nationality;
                    break;
                case "address":
                    profilInfo.innerHTML = address1 + "<br>" + address2;
                    break;
                case "phone":
                    profilInfo.innerHTML = phone;
                    break;
                case "mail":
                    profilInfo.innerHTML = mail;
                    break;
            }
        });
    }
}

function buildFormations(formations){
    formationsList = document.getElementById("formations_list")
    if(formations){
        formations.forEach((formation) => {
            let formationLi = document.createElement("li")
            let formationDiplome = document.createElement("h3")
            let formationEtablissement = document.createElement("h4")
            let formationAnnee = document.createElement("span")
            let formationDescription = document.createElement("p")

            formationDiplome.textContent = formation["diplome"]
            formationEtablissement.textContent = formation["etablissement"]
            formationAnnee.textContent = formation["annee"]
            formationDescription.textContent = formation["description"]

            formationLi.appendChild(formationDiplome)
            formationLi.appendChild(formationEtablissement)
            formationLi.appendChild(formationAnnee)
            formationLi.appendChild(formationDescription)

            if(formation["code_etablissement"]){
                let formationCodeEtablissement = document.createElement("span")
                formationCodeEtablissement.classList.add("code_etablissement")
                formationCodeEtablissement.textContent = formation["code_etablissement"]
                formationEtablissement.appendChild(formationCodeEtablissement)
            }

            if(formation["etablissement2"]){
                let formationEtablissement2 = document.createElement("h4")
                formationEtablissement2.textContent = formation["etablissement2"]
                formationLi.appendChild(formationEtablissement2)

                if(formation["code_etablissement2"]){
                    let formationCodeEtablissement2 = document.createElement("span")
                    formationCodeEtablissement2.classList.add("code_etablissement")
                    formationCodeEtablissement2.textContent = formation["code_etablissement2"]
                    formationEtablissement2.appendChild(formationCodeEtablissement2)
                }
            }

            formationsList.appendChild(formationLi)
        })
    }
}

function buildCompetences(competences){
    if(competences){
      // Programmation
      let progConfirmeList = document.querySelector("#programmation #confirme ul");
      for(let competence of competences["programmation"]["experience_confirme"]){
        let li = document.createElement("li");
        li.textContent = competence;
        progConfirmeList.appendChild(li);
      }
  
      let progIntermediaireList = document.querySelector("#programmation #intermediaire ul");
      for(let competence of competences["programmation"]["experience_intermediaire"]){
        let li = document.createElement("li");
        li.textContent = competence;
        progIntermediaireList.appendChild(li);
      }
  
      let progDecouverteList = document.querySelector("#programmation #decouverte ul");
      for(let competence of competences["programmation"]["experience_decouverte"]){
        let li = document.createElement("li");
        li.textContent = competence;
        progDecouverteList.appendChild(li);
      }
  
      // Bases de données
      let bdList = document.querySelector("#bases_de_donnees ul");
      for(let competence of competences["bases_de_donnees"]){
        let li = document.createElement("li");
        li.textContent = competence;
        bdList.appendChild(li);
      }
  
      // Autre
      let autreList = document.querySelector("#autre ul");
      for(let competence of competences["autre"]){
        let li = document.createElement("li");
        li.textContent = competence;
        autreList.appendChild(li);
      }
    }
}

function buildExperiences(experiences) {
    const experiencesList = document.querySelector('#experiences-list');
  
    for (let i = 0; i < experiences.length; i++) {
      const experience = experiences[i];
      const li = document.createElement('li');
      const title = document.createElement('h3');
      const company = document.createElement('h4');
      const date = document.createElement('p');
      const technologies = document.createElement('p');
  
      title.innerText = experience.poste;
      company.innerText = `${experience.entreprise} - ${experience.ville}, ${experience.pays}`;
      date.innerText = `${experience.debut} - ${experience.fin}`;
      technologies.innerText = experience.technologies.join(', ');
  
      li.appendChild(title);
      li.appendChild(company);
      li.appendChild(date);
      li.appendChild(technologies);
  
      experiencesList.appendChild(li);
    }
}

function buildProjets(projets) {
    let projetsDiv = document.getElementById("projets_div")
    if (projets) {
      for (let i = 0; i < projets.length; i++) {
        // Création des éléments HTML
        let projetDiv = document.createElement("div");
        let nomProjet = document.createElement("h3");
        let descriptionProjet = document.createElement("p");
        let technologiesProjet = document.createElement("ul");
        let librairiesPluginsProjet = document.createElement("ul");
  
        // Remplissage des éléments HTML avec les données du JSON
        nomProjet.textContent = projets[i].nom;
        descriptionProjet.textContent = projets[i].description;
        projets[i].technologies.forEach((technologie) => {
          let technologieLi = document.createElement("li");
          technologieLi.textContent = technologie;
          technologiesProjet.appendChild(technologieLi);
        });
        projets[i].librairies_et_plugins.forEach((librairiePlugin) => {
          let librairiePluginLi = document.createElement("li");
          librairiePluginLi.textContent = librairiePlugin;
          librairiesPluginsProjet.appendChild(librairiePluginLi);
        });
  
        // Ajout des éléments HTML au DOM
        projetDiv.appendChild(nomProjet);
        projetDiv.appendChild(descriptionProjet);
        projetDiv.appendChild(technologiesProjet);
        projetDiv.appendChild(librairiesPluginsProjet);
        projetsDiv.appendChild(projetDiv);
      }
    }
  }
//////////////

// EXECUTION //
initSite()
//////////////


const speed = .75; //vitesse du point
const screenWidth = window.innerWidth; //largeur de l'écran
const screenHeight = window.innerHeight; //hauteur de l'écran
const pointRadius = 1; //Radius du centre
let x = Math.random() * (screenWidth - 2 * pointRadius) + pointRadius; //position horizontale initiale aléatoire du point
let y = Math.random() * (screenHeight - 2 * pointRadius) + pointRadius; //position verticale initiale aléatoire du point
let vx = (Math.random() - 0.5) * speed; //vitesse horizontale initiale aléatoire du point
let vy = (Math.random() - 0.5) * speed; //vitesse verticale initiale aléatoire du point

const centerPoint = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function movePoint() {
    try {
        const triangle1 = document.getElementById("triangle1");
        const triangle2 = document.getElementById("triangle2");
        const triangle3 = document.getElementById("triangle3");

        //Centre
        x += vx;
        y += vy;

        //rebond contre les murs horizontaux
        if (x <= pointRadius + screenWidth * 15 / 100 || x >= screenWidth - pointRadius) {
            vx = -vx;
        }

        //rebond contre les murs verticaux
        if (y <= pointRadius + screenHeight * 25 / 100 || y >= screenHeight - pointRadius) {
            vy = -vy;
        }
        
        triangle2.style.clipPath = `polygon(20% 100%, ${x}px ${y}px, 66% 100%)`;
        triangle3.style.clipPath = `polygon(100% 50%, ${x}px ${y}px, 66% 100%, 100% 100%)`;

        //appel récursif de la fonction pour créer l'animation
        requestAnimationFrame(movePoint);
    } catch (error) {
        console.error(error);
        requestAnimationFrame(movePoint);
    }

}

movePoint();


function changeSection(sectionToDisplay){
    let allSections = document.querySelectorAll("section")
    allSections.forEach(eachSection => {
        eachSection.classList.remove("active")
        if(eachSection.classList.contains(sectionToDisplay)){
            eachSection.classList.add("active")
        }
    })
}