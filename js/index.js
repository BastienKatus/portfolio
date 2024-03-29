// VARIABLES //
const FILENAME = "./data/informations.json";
let currentLanguage = ""
let dataTimeline = [];
let allTechnologiesAndLibrairies = [];


let screenWidth = window.innerWidth; //largeur de l'écran
let screenHeight = window.innerHeight; //hauteur de l'écran
let centerPoint = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

const speed = .5; //vitesse du point
const pointRadius = 1; //Radius du centre
let x = Math.random() * (screenWidth - 2 * pointRadius) + pointRadius; //position horizontale initiale aléatoire du point
let y = Math.random() * (screenHeight - 2 * pointRadius) + pointRadius; //position verticale initiale aléatoire du point
let vx = (Math.random() - 0.5) * speed; //vitesse horizontale initiale aléatoire du point
let vy = (Math.random() - 0.5) * speed; //vitesse verticale initiale aléatoire du point

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
            switch(profilInfo.id) {
                case "lastname":
                    profilInfo.innerHTML = lastName;
                    break;
                case "firstname":
                    profilInfo.innerHTML = firstName;
                    break;
                case "age":
                    profilInfo.innerHTML = age.toString() + profilInfo.children[0].outerHTML + profilInfo.children[1].outerHTML;
                    break;
                case "nationality":
                    profilInfo.innerHTML = nationality;
                    break;
                case "address":
                    profilInfo.innerHTML = address1 + "<br>" + address2;
                    break;
                case "poste":
                    profilInfo.innerHTML = profilInfo.children[0].outerHTML + profilInfo.children[1].outerHTML + "<p>"+poste+"</p>";
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
                    if(tableHobbies.children[1]){
                        for( let index = 1; index <= tableHobbies.children.length; index++){
                            tableHobbies.removeChild(tableHobbies.children[index])
                        }
                    }

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
                    if(tableSoftSkills.children[1]){
                        for( let index = 1; index <= tableSoftSkills.children.length; index++){
                            tableSoftSkills.removeChild(tableSoftSkills.children[index])
                        }
                    }
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
                    ulSocial.innerHTML = "";

                    social.forEach(eachSocial => {
                        // Créer un élément <li>
                        let liSocial = document.createElement("li");

                        let link = document.createElement("a");
                        if(!eachSocial.social_name.toLowerCase().includes("phone")){
                            link.href = eachSocial.link;
                            link.target = "_blank"
                        }
                
                        let icon = document.createElement("i");
                        // Ajout de la taille de l'icone
                        eachSocial.social_icon += " fa-2xl"
                        let allClassIcons = eachSocial.social_icon.split(" ");
                        allClassIcons.map(iconClass => {
                            icon.classList.add(iconClass)
                        })
                        

                        link.appendChild(icon);
                        
                        let div = document.createElement("div");
                        div.addEventListener("click", (e) => {
                                navigator.clipboard.writeText(eachSocial.link)
                                alert("Lien vers " + eachSocial.social_name + " copié !")
                            }
                        );
                        div.innerHTML = eachSocial.link
                        
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
    if(formations){
        let tableFormations = document.getElementById("formations_table");
        tableFormations.innerHTML = "";

        formations.forEach(item => {
            let theadFormations = document.createElement("thead");
            let tbodyFormations = document.createElement("tbody");

            // Header
            const titleRow = document.createElement('tr');
            const titleFullEtablissement = document.createElement('th');
            titleFullEtablissement.textContent = item.etablissement;
            titleFullEtablissement.textContent += item.etablissement2 ? " / " + item.etablissement2 : ""; 
            titleFullEtablissement.colSpan = 4

            titleRow.appendChild(titleFullEtablissement);

            theadFormations.appendChild(titleRow);


            // Body
            const dataRow = document.createElement('tr');

            const dataRowMore = document.createElement('tr');
            dataRowMore.className = "more_informations";
            dataRowMore.className = "more_informations";
            
            const cellShowMore = document.createElement("td");
            cellShowMore.className = "fa-solid fa-plus show_more"
            cellShowMore.addEventListener("click", (e) => {
                    dataRowMore.classList.toggle("enable");
                    dataRow.classList.toggle("selected");
                }
            );

            // Main informations

            const cellPeriod = document.createElement('td');
            cellPeriod.textContent = formatDateToReadable(item.debut) + " - " +  formatDateToReadable(item.fin);
            cellPeriod.classList.add("period");

            const cellDiploma = document.createElement('td');
            cellDiploma.textContent = item.diplome;
            cellDiploma.classList.add("diploma");

            const cellEtablissement = document.createElement('td');
            cellEtablissement.textContent = item.code_etablissement;
            cellEtablissement.textContent += item.code_etablissement2 ? " / " + item.code_etablissement2 : ""; 
            cellEtablissement.classList.add("etablissement");

            const cellLocation = document.createElement('td');
            cellLocation.textContent = item.ville;
            cellLocation.classList.add("location");

            
            // Toggling informations
            const cellSpace = document.createElement("td");
            cellSpace.style = "opacity:0;"

            const cellDescription = document.createElement('td');
            cellDescription.classList.add("description");
            cellDescription.colSpan = 4;
            cellDescription.textContent = item.description;

            dataRow.appendChild(cellShowMore);
            dataRow.appendChild(cellPeriod);
            dataRow.appendChild(cellDiploma);
            dataRow.appendChild(cellEtablissement);
            dataRow.appendChild(cellLocation);

            dataRowMore.appendChild(cellSpace);
            dataRowMore.appendChild(cellDescription);
            
            tbodyFormations.appendChild(dataRow);
            tbodyFormations.appendChild(dataRowMore);
            
            // Construction du tableau
            tableFormations.appendChild(theadFormations);
            tableFormations.appendChild(tbodyFormations);
                
        });
    }
}

function buildCompetences(competences){
    if(competences){
        
        let grade = ["decouverte", "novice", "intermediaire", "avancee", "confirmee", "professionnelle"]
        let gradeDescFR = [
            "Expérience avec ce langage par curiosité.",
            "Démarrage de projets à l'aide de cette technologie qui n'ont pas abouti pour diverses raisons.",
            "Création de certaines parties d'applications et réalisation de projets, démontrant la capacité à coder des fonctionnalités basiques.",
            "Développement d'applications avec une aisance dans ce langage.",
            "Langages et technologies les mieux maîtrisé, avec la création d'applications substantielles. Familiarité avec des conventions et fonctionnalités avancées.",
            "Conception d'une ou plusieurs applications dans un contexte professionnel, exigeant la rédaction de code lisible, maintenable et robuste, démontrant ainsi la capacité à manipuler efficacement le code."
        ]
        let gradeDescEN = [
            "Experience with this language out of curiosity.",
            "Attempted to initiate projects using this technology that did not succeed for various reasons.",
            "Creation of certain application components and completion of projects, demonstrating the ability to code basic functionalities.",
            "Development of applications with ease in this language.",
            "Languages and technologies most proficiently mastered, with the creation of substantial applications. Familiarity with advanced conventions and features.",
            "Design of one or more applications in a professional context, requiring the writing of readable, maintainable, and robust code, thereby demonstrating effective code manipulation."
        ]

        let gradeDesc = gradeDescFR
        if(currentLanguage.includes("en")){
            gradeDesc = gradeDescEN
        }

        const types = competences.map(competence => competence.type);

        let containerTechnicalSkills = document.getElementById("skills_help_and_table");
        containerTechnicalSkills.innerHTML = "";

        function createBadgeDetail(niveau, badgeCell){
            const badgeDetailsCell = document.createElement('div');

            if (niveau.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(grade[0])) {
                badgeCell.classList.add(grade[0]);
                badgeDetailsCell.textContent = gradeDesc[0];
            }
            else if (niveau.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(grade[1])) {
                badgeCell.classList.add(grade[1]);
                badgeDetailsCell.textContent = gradeDesc[1];
            }
            else if (niveau.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(grade[2])) {
                badgeCell.classList.add(grade[2]);
                badgeDetailsCell.textContent = gradeDesc[2];
            }
            else if (niveau.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(grade[3])) {
                badgeCell.classList.add(grade[3]);
                badgeDetailsCell.textContent = gradeDesc[3];
            }
            else if (niveau.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(grade[4])) {
                badgeCell.classList.add(grade[4]);
                badgeDetailsCell.textContent = gradeDesc[4];
            }
            else{
                badgeCell.classList.add(grade[5]);
                badgeDetailsCell.textContent = gradeDesc[5];
            }

            badgeDetailsCell.classList.add("badge_details")
            return badgeDetailsCell
        }
        
        if (screenWidth <= 1024) {
            // Format téléphone et tablette portrait et tablette paysage

            types.forEach(type => {
                let tableTechnicalSkills = document.createElement("table");
                tableTechnicalSkills.id = "technical_skills";
                tableTechnicalSkills.className = "custom-table";
                let theadTechnicalSkills = document.createElement("thead");
                let tbodyTechnicalSkills = document.createElement("tbody");

                // Créer la ligne d'en-tête
                const headerRow = document.createElement('tr');

                const headerCell = document.createElement('th');
                headerCell.textContent = competences.find(competence => competence.type === type).titre;
                headerRow.appendChild(headerCell);
                
                theadTechnicalSkills.appendChild(headerRow);

                // Créer les lignes de données
                const competence = competences.find(competence => competence.type === type);
                
                if (competence) {
                    competence.value.forEach(value => {
                        let dataRow = document.createElement('tr');
        
                        const valueCell = document.createElement('td');

                        const { technologie, niveau } = value;
                        const techCell = document.createElement('span');
                        const badgeCell = document.createElement('span');
                        techCell.textContent = technologie;
                        badgeCell.classList.add('badge');

                        // Ajouter le grade du badge
                        badgeCell.appendChild(createBadgeDetail(niveau, badgeCell))
                        
                        valueCell.appendChild(techCell);
                        valueCell.appendChild(badgeCell);

                        dataRow.appendChild(valueCell);
                        tbodyTechnicalSkills.appendChild(dataRow);
                    })
                }
                    
                // Construction du tableau
                tableTechnicalSkills.appendChild(theadTechnicalSkills);
                tableTechnicalSkills.appendChild(tbodyTechnicalSkills);

                containerTechnicalSkills.appendChild(tableTechnicalSkills);
            });
        } else {
            // Format ordinateur

            let tableTechnicalSkills = document.createElement("table");
            tableTechnicalSkills.id = "technical_skills";
            tableTechnicalSkills.className = "custom-table";
            let theadTechnicalSkills = document.createElement("thead");
            let tbodyTechnicalSkills = document.createElement("tbody");
        

            // Créer la ligne d'en-tête
            const headerRow = document.createElement('tr');

            for (let i = 0; i < types.length; i++) {
                const headerCell = document.createElement('th');
                headerCell.textContent = competences[i].titre;
                headerRow.appendChild(headerCell);
            };

            theadTechnicalSkills.appendChild(headerRow);

            // Trouver le nombre maximum de valeurs par type
            const maxValues = Math.max(...competences.map(competence => competence.value.length));

            // Créer les lignes de données
            for (let i = 0; i < maxValues; i++) {
                const dataRow = document.createElement('tr');

                types.forEach(type => {
                    const valueCell = document.createElement('td');
                    const competence = competences.find(competence => competence.type === type);
                    
                    if (competence && competence.value[i]) {
                        const { technologie, niveau } = competence.value[i];
                        const techCell = document.createElement('span');
                        const badgeCell = document.createElement('span');
                        techCell.textContent = technologie;
                        badgeCell.classList.add('badge');

                        // Ajouter le grade du badge
                        badgeCell.appendChild(createBadgeDetail(niveau, badgeCell))
                        
                        valueCell.appendChild(techCell);
                        valueCell.appendChild(badgeCell);
                    }

                    dataRow.appendChild(valueCell);
                });

                tbodyTechnicalSkills.appendChild(dataRow);
            }
            
            // Construction du tableau
            tableTechnicalSkills.appendChild(theadTechnicalSkills);
            tableTechnicalSkills.appendChild(tbodyTechnicalSkills);

            containerTechnicalSkills.appendChild(tableTechnicalSkills);
        }
    }
}

function buildExperiences(experiences) {
    if(experiences){

        let tableExperiences = document.getElementById("experiences_table");
        tableExperiences.innerHTML = "";
        let theadExperiences = document.createElement("thead");
        let tbodyExperiences = document.createElement("tbody");

        // Header
        const titleRow = document.createElement('tr');
        const titlePeriod = document.createElement('th');
        titlePeriod.textContent = "Période"
        const titleContract = document.createElement('th');
        titleContract.textContent = "Type de contrat"
        const titlePoste = document.createElement('th');
        titlePoste.textContent = "Intitulé du poste"
        const titleCompany = document.createElement('th');
        titleCompany.textContent = "Entreprise"
        const titleTechnologies = document.createElement('th');
        titleTechnologies.textContent = "Technologies"

        titleRow.appendChild(titlePeriod);
        titleRow.appendChild(titleContract);
        titleRow.appendChild(titlePoste);
        titleRow.appendChild(titleCompany);
        titleRow.appendChild(titleTechnologies);

        theadExperiences.appendChild(titleRow);


        // Body
        experiences.forEach(experience => {
            const dataRow = document.createElement('tr');
            const dataRowMore = document.createElement('tr');
            dataRowMore.className = "more_informations";

            // Main informations
            
            const cellShowMore = document.createElement("td");
            cellShowMore.className = "fa-solid fa-plus show_more"
            cellShowMore.addEventListener("click", (e) => {
                    dataRowMore.classList.toggle("enable");
                    dataRow.classList.toggle("selected");
                }
            );
            dataTitleFR = ["Période", "Contrat", "Poste", "Entreprise"]
            dataTitleEN = ["Period", "Contract", "Job", "Company"]
            dataTitle = []
            if(currentLanguage.includes("fr")){
                dataTitle = dataTitleFR
            }
            else{
                dataTitle = dataTitleEN
            }

            const cellPeriod = document.createElement('td');
            cellPeriod.textContent = formatDateToReadable(experience.debut) + " - " +  formatDateToReadable(experience.fin);
            cellPeriod.classList.add("period");
            cellPeriod.setAttribute("data-title", dataTitle[0]);

            const cellContract = document.createElement('td');
            cellContract.textContent = experience.contrat;
            cellContract.classList.add("contract");
            cellContract.setAttribute("data-title", dataTitle[1]);

            const cellPoste = document.createElement('td');
            cellPoste.textContent = experience.poste;
            cellPoste.classList.add("poste");
            cellPoste.setAttribute("data-title", dataTitle[2]);

            const cellCompany = document.createElement('td');
            let location = experience.ville + ", " + experience.pays;
            cellCompany.textContent = experience.entreprise + ", " + location;
            cellCompany.classList.add("company");
            cellCompany.setAttribute("data-title", dataTitle[3]);

            
            // Toggling informations
            const cellSpace = document.createElement("td");
            cellSpace.style = "opacity:0;"

            const cellDescription = document.createElement('td');
            cellDescription.classList.add("description");
            cellDescription.colSpan = 3;

            experience.description.map(desc => {
                const description = document.createElement("p");
                description.textContent = desc
                cellDescription.appendChild(description);
            })

            const cellTechnologies = document.createElement('td');
            cellTechnologies.classList.add("technologies");

            experience.technologies.map((techno) => {
                const technologyBadge = document.createElement("div");
                technologyBadge.innerText = techno;
    
                cellTechnologies.appendChild(technologyBadge );
            });

            dataRow.appendChild(cellShowMore);
            dataRow.appendChild(cellPeriod);
            dataRow.appendChild(cellContract);
            dataRow.appendChild(cellPoste);
            dataRow.appendChild(cellCompany);
            
            dataRowMore.appendChild(cellSpace);
            dataRowMore.appendChild(cellDescription);
            dataRowMore.appendChild(cellTechnologies);

            tbodyExperiences.appendChild(dataRow);
            tbodyExperiences.appendChild(dataRowMore);
        })
        
        // Construction du tableau
        tableExperiences.appendChild(theadExperiences);
        tableExperiences.appendChild(tbodyExperiences);
    }
}

function buildProjets(projets) {
    let projetsDiv = document.getElementById("projets_div")
    projetsDiv.innerHTML = "";
    // Mise à jour de l'affichage en cas de filtrage
    while (projetsDiv.firstChild) {
        projetsDiv.removeChild(projetsDiv.firstChild);
    }

    if (projets) {
        projets.forEach(projet => {
            const card = document.createElement("div");
            card.classList.add("card");

            let stringTechnologies = ""
            projet.technologies.forEach(techologie => {
                stringTechnologies += "#" + techologie + " ";

                // Ajout des classes tags sur la carte
                card.classList.add(techologie)

                // Ajout à la liste des technologies
                if(!allTechnologiesAndLibrairies.includes(techologie)){
                    allTechnologiesAndLibrairies.push(techologie)
                }
            });

            let stringLibrairiesPlugins = ""
            projet.librairies_et_plugins.forEach(librairy_et_plugin => {
                stringLibrairiesPlugins += "#" + librairy_et_plugin + " ";

                // Ajout des classes tags sur la carte
                card.classList.add(librairy_et_plugin)

                // Ajout à la liste des technologies
                if(!allTechnologiesAndLibrairies.includes(librairy_et_plugin)){
                    allTechnologiesAndLibrairies.push(librairy_et_plugin)
                }
            });

            // Les informations détaillées sont stockés dans cardInnerContent
            const cardInnerContent = document.createElement("div");
            cardInnerContent.classList.add("card_inner_content");

            const cardInnerDate = document.createElement("div");
            cardInnerDate.classList.add("card_inner_date");
            cardInnerDate.textContent = formatDateToReadable(projet.debut) + " - " + formatDateToReadable(projet.fin);

            const cardInnerDescription = document.createElement("div");
            cardInnerDescription.classList.add("card_inner_description");
            cardInnerDescription.textContent = projet.description;

            const cardInnerSpan = document.createElement("span");

            // Container des technologies
            const cardInnerTechnologiesContainer = document.createElement("div");

            const cardInnerTechnologiesTitle = document.createElement("div");
            cardInnerTechnologiesTitle.textContent = "Technologies"

            const cardInnerTechnologies = document.createElement("div");
            cardInnerTechnologies.classList.add("card_inner_technologies");
            cardInnerTechnologies.textContent = stringTechnologies;

            cardInnerTechnologiesContainer.appendChild(cardInnerTechnologiesTitle)
            cardInnerTechnologiesContainer.appendChild(cardInnerTechnologies)
            
            // Container des librairies et plugins
            const cardInnerLibrariesPluginsContainer = document.createElement("div");

            const cardInnerLibrariesPluginsTitle = document.createElement("div");
            cardInnerLibrariesPluginsTitle.textContent = "Bibliothèques"

            const cardInnerLibrariesPlugins = document.createElement("div");
            cardInnerLibrariesPlugins.classList.add("card_inner_librairies_plugins");
            cardInnerLibrariesPlugins.textContent = stringLibrairiesPlugins;

            cardInnerLibrariesPluginsContainer.appendChild(cardInnerLibrariesPluginsTitle)
            cardInnerLibrariesPluginsContainer.appendChild(cardInnerLibrariesPlugins)
            
            cardInnerSpan.appendChild(cardInnerTechnologiesContainer);
            cardInnerSpan.appendChild(cardInnerLibrariesPluginsContainer);

            // La face de la card et les informations sont stockées ci dessous 
            const cardFace = document.createElement("div");
            cardFace.classList.add("card_face");
            cardFace.style.backgroundImage = "url('../data/images/" + projet.image + "')";


            const cardFaceContent = document.createElement("div");
            cardFaceContent.classList.add("card_face_content");

            const cardTitle = document.createElement("div");
            cardTitle.classList.add("card_face_title");
            cardTitle.textContent = projet.nom;

            const cardTechnologies = document.createElement("div");
            cardTechnologies.classList.add("card_face_technologies");
            cardTechnologies.innerHTML = stringTechnologies

            // Construction de la carte
            cardInnerContent.appendChild(cardInnerDate)
            cardInnerContent.appendChild(cardInnerDescription)
            cardInnerContent.appendChild(cardInnerSpan)

            cardFaceContent.appendChild(cardTitle);
            cardFaceContent.appendChild(cardTechnologies);
            cardFace.appendChild(cardFaceContent);
            
            card.appendChild(cardInnerContent);
            card.appendChild(cardFace);

            projetsDiv.appendChild(card);
        });
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
        
        screenWidth = window.innerWidth; //largeur de l'écran
        screenHeight = window.innerHeight; //hauteur de l'écran
        centerPoint = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

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


        if (screenWidth >= 768 && screenWidth <= 1024) {
            triangle2.style.clipPath = `polygon(10% 100%, ${x}px ${y}px, 66% 100%)`;
            triangle3.style.clipPath = `polygon(100% 50%, ${x}px ${y}px, 40% 100%, 100% 100%)`;

        } else if (screenWidth >= 481 && screenWidth <= 767) {
            triangle2.style.display = `none`
            triangle3.style.display = `none`

        } else if (screenWidth <= 480) {
            triangle2.style.display = `none`
            triangle3.style.display = `none`
        }else{
            triangle2.style.clipPath = `polygon(20% 100%, ${x}px ${y}px, 66% 100%)`;
            triangle3.style.clipPath = `polygon(100% 50%, ${x}px ${y}px, 66% 100%, 100% 100%)`;
        }

        //appel récursif de la fonction pour créer l'animation
        requestAnimationFrame(movePoint);
    } catch (error) {
        //console.error(error);
        requestAnimationFrame(movePoint);
    }
}

function createTimelineItem(item) {

    if(item.type == "yearMarker"){
        const yearMarker = document.createElement("div");
        yearMarker.classList.add("yearMarker");

        const yearValue = document.createElement("p");
        yearValue.innerHTML = item.debut;

        yearMarker.appendChild(yearValue)


        return yearMarker;
    }

    const liContainer = document.createElement("li");
    liContainer.classList.add("timeline-container");

    liContainer.addEventListener("click", (e) =>
        liContainer.classList.toggle("active")
    );

    const icon = document.createElement("icon");
    icon.classList.add("icon");
  
    const card = document.createElement("div");
    card.classList.add("timeline-card");

    if(item.type == "experience") {      
        const title = document.createElement("h2");
        title.textContent = item.poste;
      
        const period = document.createElement("small");
        startDate = formatDateToReadable(item.debut)
        endDate = formatDateToReadable(item.fin)
        period.textContent = `${startDate} - ${endDate}`;
      
      
        const arrow = document.createElement("span");
      
        card.appendChild(title);
        card.appendChild(period);
        card.appendChild(arrow);
      
        item.description.map(desc => {
            const description = document.createElement("p");
            description.textContent = desc
            card.appendChild(description);
        })
    }
    else if(item.type == "formation"){      
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
    }
    else if(item.type == "project"){      
        const title = document.createElement("h2");
        title.textContent = item.nom;

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
    }

    liContainer.appendChild(icon);
    liContainer.appendChild(card);
  
    return liContainer;
}  

function buildTimeline(dataTimeline){
    const timelineDiv = document.getElementById("timeline");
    timelineDiv.innerHTML = ""
    if (!timelineDiv) {
        return;
    }
    const ul = document.createElement("ul");

    console.log("Building a timeline", dataTimeline)
    // Ajout des marqueurs d'années
    let startYearMarker = 2018
    const years = [];
    for (let i = startYearMarker; i <= new Date().getFullYear()+1; i++) {
        year = {}
        year.type = "yearMarker"
        year.debut = i.toString()
        years.push(year)
    }
    dataTimeline.push(years)

    // Mise en place du tri par date
    let sortTimeLine = [];

    dataTimeline.forEach((eachCategory) => {
            eachCategory.forEach((item) => {
                sortTimeLine.push(item)
        });
    });

    sortTimeLine.sort((a, b) => new Date(b.debut) - new Date(a.debut))

    console.log("sorted data", sortTimeLine)
    // Création de la Timeline
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
        if(currentLanguage.includes("en")){
            return "In progress"
        }

        return "En cours"
    }
    else {
        const dateObj = new Date(dateStr);

        const day = dateObj.getDate();
        const monthNamesFR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        const monthNamesEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        let monthNames = monthNamesFR
        if(currentLanguage.includes("en")){
            monthNames = monthNamesEN
        }

        const month = monthNames[dateObj.getMonth()];
        const year = dateObj.getFullYear();
    
        let readableDate = `${month} ${year}`;
        if(currentLanguage.includes("en")){
            readableDate = `${year} ${month}`;
        }
    
        return readableDate;
    }
}

function buildSearchAndFilterBar(projets){
    if(allTechnologiesAndLibrairies){
        const filterBar = document.getElementById("filter_bar");
        filterBar.innerHTML = ""

        let postsData = projets;
        let filterData = allTechnologiesAndLibrairies;
        const filterContainer = document.createElement("div");
        filterContainer.classList.add("filter-container");


        const createFilter = (filter) => {
            const filterButton = document.createElement("button");
            filterButton.className = "filter-button";
            filterButton.innerText = filter;
            filterButton.setAttribute('data-state', 'inactive');
            filterButton.addEventListener("click", (e) =>
                handleButtonClick(e, filter)
            );

            filterContainer.appendChild(filterButton);
        };

        const resetFilterButtons = (currentButton) => {
            const filterButtons = document.querySelectorAll('.filter-button');
            [...filterButtons].map(button => {
                if (button != currentButton) {
                    button.classList.remove('is-active');
                    button.setAttribute('data-state', 'inactive')
                }
            })
        }

        const activeFilters = new Set();

        const handleButtonClick = (e, param) => {
            const button = e.target;
            const buttonState = button.getAttribute('data-state');
            
            if (buttonState === 'inactive') {
                activeFilters.add(param);
            } else {
                activeFilters.delete(param);
            }
            
            if (activeFilters.size === 0) {
                resetPosts();
            } else {
                handleFilterPosts();
            }

            button.classList.toggle('is-active');
            button.setAttribute('data-state', buttonState === 'active' ? 'inactive' : 'active');
        };

        const handleFilterPosts = () => {
            const filteredPosts = postsData.filter(post => {
                return [...activeFilters].some(filter => post.technologies.includes(filter) || post.librairies_et_plugins.includes(filter));
            });
            buildProjets(filteredPosts);
        };

        const resetPosts = () => {
            buildProjets(postsData)
        }

        
        const resetAllFilters = () => {
            activeFilters.clear();
            resetFilterButtons();
            resetPosts();
        };
        
        filterData.map((filter) => createFilter(filter));

        // Ajout du clear Filter
        const resetFiltersButton = document.createElement("button");
        resetFiltersButton.className = "fa-solid fa-filter-circle-xmark"
        resetFiltersButton.classList.add("reset-filter-button");
        resetFiltersButton.addEventListener("click", resetAllFilters);

        filterBar.appendChild(filterContainer);
        filterBar.appendChild(resetFiltersButton);
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

function showSkillsInformation(){
    let helpContent = document.getElementById("skills_help")
    let presentationText = document.getElementById("skills_know_more")
    let morePresentation = document.getElementById("skills_informations")
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
    
    helpContent.classList.toggle("active");
}

function initializeModeTheme(){
    const bodyDOM = document.getElementById("portfolio_website");
    // Detect if user preference is dark
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: light)");
    
    // Settings default theme mode
    bodyDOM.classList.add(prefersDarkScheme.matches === "dark" ? "dark" : "light");
}

function toggleModeTheme(){
    const bodyDOM = document.getElementById("portfolio_website");

    bodyDOM.classList.toggle("dark")
    bodyDOM.classList.toggle("light")
    console.log("You changed theme mode ");
}

function initializeLanguage(){
    let navigatorLanguage = navigator.language
    let langValue = "" 
    if(navigatorLanguage.includes("en")){
        langValue = "english"
    }
    else{
        langValue = "francais"
    }
    handleLanguageChange(langValue)
    return langValue
}

function handleLanguageChange(langValue) {
    pickerOption = document.getElementById("language_picker_option");
    textLabel = "";

    // Span Option
    spanOptions = pickerOption.children[1];
    for(index = 0; index < spanOptions.children.length; index++){
        languageOption = spanOptions.children[index];
        if(languageOption.children[1].innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(langValue)){
            textLabel = languageOption.innerHTML;
            console.log("found langugae", textLabel)
            spanOptions.removeChild(languageOption)
            spanOptions.insertBefore(languageOption, spanOptions.firstChild)
        }
    }

    // Span Label 
    spanLabel = pickerOption.children[0];
    divContainerLabel = document.createElement("div");
    divContainerLabel.innerHTML = textLabel;
    spanLabel.innerHTML = "";
    spanLabel.appendChild(divContainerLabel);

    // Hide wrong language content
    var langDivs = document.querySelectorAll('[lang]'); // Get all elements with lang attribute
    for (var i = 0; i < langDivs.length; i++) {
      if (langValue.includes(langDivs[i].getAttribute('lang'))) {
        langDivs[i].style.display = 'unset';
      } else {
        langDivs[i].style.display = 'none';
      }
    }
    currentLanguage = langValue
    initSite(langValue)
}

function initSite(dataLangValue) {
    console.log("Start website with: ", dataLangValue)

    // Initialize the theme mode
    initializeModeTheme()

    let langValue = dataLangValue
    // Initialize the language
    if(dataLangValue == undefined || dataLangValue ==  null || dataLangValue == ""){
        langValue = initializeLanguage()   
    } 

    // Recuperation des informations du fichier
    fetch(FILENAME)
    .then(response => response.json())
    .then(data => {
        console.log("langValue", langValue)
        // Clear data timeline
        dataTimeline = [];
        if (!data[langValue] || typeof data[langValue] !== "object" || Object.keys(data[langValue]).length === 0) {
            data = data["francais"];
        } else {
            data = data[langValue];
        }

        // PROFIL
        try{
            let profil = data["profil"]
            buildProfil(profil)
        }
        catch(profilError){
            console.log("Erreur lors du chargement du profile")
        }

        // FORMATIONS
        // try{
        //     let formations = data["formations"]
        //     dataTimeline.push(formations)
        //     buildFormations(formations)
        // }
        // catch(formationsError){
        //     console.log("Erreur lors du chargement des formations", formationsError)
        // }

        // COMPETENCES
        try{
            let competences = data["competences"]
            buildCompetences(competences)
        }
        catch(competencesError){
            console.log("Erreur lors du chargement des compétences", competencesError)
        }

        // EXPERIENCES ET FORMATIONS
        try{
            let experiences = data["experiences_professionnelles"]
            dataTimeline.push(experiences)
            buildExperiences(experiences)
            
            let formations = data["formations"]
            dataTimeline.push(formations)
            buildFormations(formations)
        }
        catch(experiencesError){
            console.log("Erreur lors du chargement des expériences professionnel", experiencesError)
        }

        // PROJETS UNIVERSITAIRES
        // try {
            let projets = data["projets"];
            dataTimeline.push(projets)
            buildProjets(projets);
            buildSearchAndFilterBar(projets)
        // } catch (projetsError) {
        //     console.log("Erreur lors du chargement des projets universitaires");
        // }
    
        // MY WHOLE TIMELINE
        // try {
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