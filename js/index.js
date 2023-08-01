// VARIABLES //
const FILENAME = "./data/informations.json";
const dataTimeline = [];

    // Moving point
const speed = .5; //vitesse du point
const screenWidth = window.innerWidth; //largeur de l'écran
const screenHeight = window.innerHeight; //hauteur de l'écran
const pointRadius = 1; //Radius du centre
let x = Math.random() * (screenWidth - 2 * pointRadius) + pointRadius; //position horizontale initiale aléatoire du point
let y = Math.random() * (screenHeight - 2 * pointRadius) + pointRadius; //position verticale initiale aléatoire du point
let vx = (Math.random() - 0.5) * speed; //vitesse horizontale initiale aléatoire du point
let vy = (Math.random() - 0.5) * speed; //vitesse verticale initiale aléatoire du point
const centerPoint = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

//////////////


// FUNCTION //
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
        let poste = profil["poste"];
        let presentation = profil["presentation_text"];
        let morePresentation = profil["more_presentation"];
        let hobbies = profil["hobbies"];
        let softSkills = profil["soft_skills"];
        let social = profil["social"];
        

        // Sélection de tous les éléments avec la classe "profil-info"
        let profilInfos = document.querySelectorAll(".profil-info");
        profilInfos.forEach(function(profilInfo) {
            // Ajout du contenu correspondant à chaque élément
            console.log(profilInfo.id)
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
                case "poste":
                    profilInfo.innerHTML = "<p> Actuellement en tant que: </p> <p>"+poste+"</p>";
                    break;
                case "phone":
                    profilInfo.innerHTML = phone;
                    break;
                case "mail":
                    profilInfo.innerHTML = mail;
                    break;
                case "presentation_text":
                    profilInfo.innerHTML = presentation;
                    break;
                case "more_presentation":
                    profilInfo.innerHTML = morePresentation;
                    break;
                case "hobbies":
                    let tableHobbies = document.getElementById("hobbies");                
                    let tbodyHobbies = document.createElement("tbody");
                  
                    hobbies.forEach(hobby => {
                      let row = document.createElement("tr");
                      let cell = document.createElement("td");
                      cell.textContent = hobby;
                      row.appendChild(cell);
                      tbodyHobbies.appendChild(row);
                    });
                  
                    tableHobbies.appendChild(tbodyHobbies);
                    break;
                      
                case "soft_skills":
                    let tableSoftSkills = document.getElementById("soft_skills");
                    let tbodySoftSkills = document.createElement("tbody");
                    
                    softSkills.forEach(softSkill => {
                        let row = document.createElement("tr");
                        let cell = document.createElement("td");
                        cell.innerHTML = softSkill;
                        row.appendChild(cell);
                        tbodySoftSkills.appendChild(row);
                    });
                    
                    tableSoftSkills.appendChild(tbodySoftSkills);
                    break;

                case "social":
                    let ulSocial = document.getElementById("social");

                    social.forEach(eachSocial => {
                        // Créer un élément <li>
                        let liSocial = document.createElement("li");

                        let link = document.createElement("a");
                        link.href = eachSocial.link;
                
                        let icon = document.createElement("i");
                        icon.classList.add("material-icons");
                        icon.innerHTML = eachSocial.social_icon;
                        

                        link.appendChild(icon);
                        
                        let div = document.createElement("div");
                        div.innerHTML = eachSocial.display_link
                        
                        liSocial.appendChild(link);
                        liSocial.appendChild(div);
                        
                        // Ajouter l'élément <li> à l'élément <ul>
                        ulSocial.appendChild(liSocial);
                    });
                    
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

function changeSection(sectionToDisplay){
    let allSections = document.querySelectorAll("section")
    allSections.forEach(eachSection => {
        eachSection.classList.remove("active")
        if(eachSection.classList.contains(sectionToDisplay)){
            eachSection.classList.add("active")
        }
    })
}

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
        //console.error(error);
        requestAnimationFrame(movePoint);
    }
}

function createTimelineItem(item) {
    if(item.type == "experience") {
        const liContainer = document.createElement("li");
        liContainer.classList.add("timeline-container");
      
        const icon = document.createElement("div");
        icon.classList.add("icon");
      
        const card = document.createElement("div");
        card.classList.add("timeline-card");
      
        const title = document.createElement("h2");
        title.textContent = item.poste;
      
        const period = document.createElement("small");
        startDate = formatDateToReadable(item.debut)
        endDate = formatDateToReadable(item.fin)
        period.textContent = `${startDate} - ${endDate}`;
      
        const description = document.createElement("p");
        description.textContent = item.description;
      
        const arrow = document.createElement("span");
      
        card.appendChild(title);
        card.appendChild(period);
        card.appendChild(description);
        card.appendChild(arrow);
      
        liContainer.appendChild(icon);
        liContainer.appendChild(card);
      
        return liContainer;
    }
    else if(item.type == "formation"){
        const liContainer = document.createElement("li");
        liContainer.classList.add("timeline-container");
      
        const icon = document.createElement("div");
        icon.classList.add("icon");
      
        const card = document.createElement("div");
        card.classList.add("timeline-card");
      
        const title = document.createElement("h2");
        title.textContent = item.code_etablissement;
        title.textContent += item.code_etablissement2 ? " / " + item.code_etablissement2 : ""; 
        title.textContent += " " + item.ville;

        const period = document.createElement("small");
        startDate = formatDateToReadable(item.debut)
        endDate = formatDateToReadable(item.fin)
        period.textContent = `${startDate} - ${endDate}`;
      
        const description = document.createElement("p");
        description.textContent = item.diplome;

        
        const ecole = document.createElement("p");
        ecole.textContent = item.etablissement;
        ecole.textContent += item.etablissement2 ? "\n/ " + item.etablissement2 : ""; 

        const arrow = document.createElement("span");
      
        card.appendChild(title);
        card.appendChild(period);
        card.appendChild(description);
        card.appendChild(arrow);
        card.appendChild(ecole);
      
        liContainer.appendChild(icon);
        liContainer.appendChild(card);
      
        return liContainer;
    }
    else if(item.type == "project"){
        const liContainer = document.createElement("li");
        liContainer.classList.add("timeline-container");
      
        const icon = document.createElement("div");
        icon.classList.add("icon");
      
        const card = document.createElement("div");
        card.classList.add("timeline-card");
      
        const title = document.createElement("h2");
        title.textContent = item.nom;

        const period = document.createElement("small");
        startDate = formatDateToReadable(item.debut)
        endDate = formatDateToReadable(item.fin)
        period.textContent = `${startDate} - ${endDate}`;
      
        const description = document.createElement("p");
        description.textContent = item.diplome;

        const arrow = document.createElement("span");
      
        card.appendChild(title);
        card.appendChild(period);
        card.appendChild(description);
        card.appendChild(arrow);
      
        liContainer.appendChild(icon);
        liContainer.appendChild(card);
      
        return liContainer;
    }

    // Returning something empty
    return document.createElement("div")
}

function buildTimeline(dataTimeline){
    const timelineDiv = document.getElementById("timeline");
    if (!timelineDiv) {
        return;
    }

    const ul = document.createElement("ul");

    let sortTimeLine = [];

    dataTimeline.forEach((eachCategory) => {
            eachCategory.forEach((item) => {
                sortTimeLine.push(item)
        });
    });

    sortTimeLine.sort((a, b) => new Date(b.debut) - new Date(a.debut))


    sortTimeLine.forEach((eachItem) => {
        const liContainer = createTimelineItem(eachItem);
        ul.appendChild(liContainer);
    });

    timelineDiv.appendChild(ul);

    // Effet d'affichage au scroll
    (function () {
        "use strict";

        // define variables
        var items = document.querySelectorAll("#timeline li");
        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function callbackFunc() {
            for (var i = 0; i < items.length; i++) {
                if (isElementInViewport(items[i])) {
                    items[i].classList.add("in-view");
                }
            }
        }

        // listen for events
        window.addEventListener("load", callbackFunc);
        window.addEventListener("resize", callbackFunc);
        window.addEventListener("scroll", callbackFunc);
    })()
}

function formatDateToReadable(dateStr) {
    if(dateStr == ""){
        return "En cours"
    }
    else {
        const dateObj = new Date(dateStr);

        const day = dateObj.getDate();
        const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        const month = monthNames[dateObj.getMonth()];
        const year = dateObj.getFullYear();
    
        const readableDate = `${month} ${year}`;
    
        return readableDate;
    }
}


function showMore(){
    let presentationText = document.getElementById("presentation_text")
    let morePresentation = document.getElementById("more_presentation")
    if (presentationText.style.display === "flex") {
        presentationText.style.display = "none";
    } else {
        presentationText.style.display = "flex";
    }
    
    if (morePresentation.style.display === "flex") {
        morePresentation.style.display = "none";
    } else {
        morePresentation.style.display = "flex";
    }
}

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
            dataTimeline.push(formations)
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
            dataTimeline.push(experiences)
            buildExperiences(experiences)
        }
        catch(experiencesError){
            console.log("Erreur lors du chargement des expériences professionnel", experiencesError)
        }

        // PROJETS UNIVERSITAIRES
        try {
            let projets = data["projets_universitaires"];
            dataTimeline.push(projets)
            buildProjets(projets);
        } catch (projetsError) {
            console.log("Erreur lors du chargement des projets universitaires");
        }
    
        // MY WHOLE TIMELINE
        //try {
            buildTimeline(dataTimeline)
        // } catch (projetsError) {
        //     console.log("Erreur lors du chargement de Ma Timeline");
        // }
    })
    .catch(error => {
        console.error('Erreur lors du chargement des données JSON\n', error);
    });
}
//////////////

// EXECUTION //
initSite();
movePoint();
//////////////