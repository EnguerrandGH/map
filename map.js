
let svg = document.querySelector("#map svg g");
let paths = svg.querySelectorAll("path");
let requestedCountry = document.querySelector("#requestedCountry");
let body = document.querySelector("body");

let country = "";
let countries = [];


let countries_FR = ["Russie","Canada","États-Unis","Chine","Brésil","Australie","Inde","Argentine","Kazakhstan","Algérie","République démocratique du Congo","Danemark","Arabie saoudite","Mexique","Indonésie","Soudan","Libye","Iran","Mongolie","Pérou","Tchad","Niger","Angola","Mali","Afrique du Sud","Colombie","Éthiopie","Bolivie","Mauritanie","Égypte","Tanzanie","Nigeria","Venezuela","Namibie","Mozambique","Pakistan","Turquie","Chili","Zambie","Birmanie","France","Afghanistan","Soudan du Sud","Somalie","République centrafricaine","Ukraine","Madagascar","Botswana","Kenya","Yémen","Thaïlande","Espagne","Turkménistan","Cameroun","Papouasie-Nouvelle-Guinée","Suède","Ouzbékistan","Maroc","Irak","Paraguay","Zimbabwe","Japon","Allemagne","République du Congo","Finlande","Viêt Nam","Malaisie","Norvège","Côte d'Ivoire","Pologne","Oman","Italie","Philippines","Burkina Faso","Nouvelle-Zélande","Gabon","Sahara occidental","Équateur","Guinée","Royaume-Uni","Ouganda","Ghana","Roumanie","Laos","Guyana","Biélorussie","Kirghizistan","Sénégal","Syrie","Cambodge","Uruguay","Suriname","Tunisie","Népal","Bangladesh","Tadjikistan","Grèce","Nicaragua","Corée du Nord","Malawi"];

let countries_EG = ["Russia","Canada","China","United States","Brazil","Australia","India","Argentina","Kazakhstan","Algeria","Democratic Republic of Congo","Greenland","Saudi Arabia","Mexico","Indonesia","Sudan","Libya","Iran","Mongolia","Peru","Chad","Niger","Angola","Mali","South Africa","Colombia","Ethiopia","Bolivia","Mauritania","Egypt","Tanzania","Nigeria","Venezuela","Pakistan","Namibia","Mozambique","Turkey","Chile","Zambia","Myanmar","Afghanistan","Somalia","Central African Republic","South Sudan","Ukraine","Madagascar","Botswana","Kenya","France","Yemen","Thailand","Spain","Turkmenistan","Cameroon","Papua New Guinea","Sweden","Uzbekistan","Morocco","Iraq","Paraguay","Zimbabwe","Japan","Germany","Philippines","Congo","Finland",
                    "Vietnam","Malaysia","Norway","Côte d'Ivoire","Poland","Oman","Italy","Ecuador","Burkina Faso","New Zealand","Gabon","Western Sahara","Guinea","United Kingdom","Uganda","Ghana","Romania","Laos","Guyana","Belarus","Kyrgyzstan","Senegal","Syria","Cambodia","Uruguay","Suriname","Tunisia","Bangladesh","Nepal","Tajikistan","Greece","Nicaragua","North Korea","Malawi","Eritrea","Benin","Honduras","Liberia","Bulgaria","Cuba","Guatemala","Iceland","South Korea","Hungary","Portugal","Jordan","Serbia","Azerbaijan","Austria","United Arab Emirates","French Guiana","Czechia","Panama","Sierra Leone","Ireland","Georgia","Sri Lanka","Lithuania","Latvia","Svalbard","Togo","Croatia","Bosnia and Herzegovina","Costa Rica","Slovakia",
                    "Dominican Republic","Estonia","Denmark","Netherlands","Switzerland","Bhutan","Taiwan","Guinea-Bissau","Moldova","Belgium","Lesotho","Armenia","Solomon Islands","Albania","Equatorial Guinea","Burundi","Haiti","Rwanda","North Macedonia","Djibouti","Belize","El Salvador","Israel","Slovenia","New Caledonia","Fiji","Kuwait","Eswatini","Timor-Leste","Bahamas","Montenegro","Vanuatu","Falkland Islands","Qatar","Gambia","Jamaica","Kosovo","Lebanon","Cyprus","Puerto Rico","State of Palestine","Brunei Darussalam","Trinidad and Tobago","French Polynesia","Cabo Verde","Samoa","Luxembourg","Réunion","Mauritius","Comoros","Guadeloupe","Faeroe Islands","Martinique","China"," Hong Kong SAR","Sao Tome and Principe",
                    "Turks and Caicos Islands","Kiribati","Bahrain","Dominica","Tonga","Singapore","Micronesia","Saint Lucia","Isle of Man","Guam","Andorra","Northern Mariana Islands","Palau","Seychelles","Curaçao","Antigua and Barbuda","Barbados","Saint Helena","Saint Vincent and the Grenadines","Mayotte","United States Virgin Islands","Grenada","Caribbean Netherlands","Malta","Maldives","Cayman Islands","Saint Kitts and Nevis","Niue","Saint Pierre and Miquelon","Cook Islands","American Samoa","Marshall Islands","Aruba","Liechtenstein","British Virgin Islands","Wallis and Futuna Islands","Montserrat","Anguilla","San Marino","Bermuda","Saint Martin","Sint Maarten","China"," Macao SAR","Tuvalu","Saint Barthélemy","Nauru",
                    "Tokelau","Gibraltar","Monaco","Holy See","Channel Islands"];

let sorted_countries = [];

let length = 170;

for (let i = 0 ; i < length ; i++) {
    sorted_countries.push(countries_EG[i]);
}

for (let i = 0 ; i < paths.length ; i++) {

    if ( sorted_countries.includes(paths[i].getAttribute("title")) ) {
        countries.push( paths[i] );
    }

}

randomCountry();

// détecter l'id + le pays sélectionné.

for (let i = 0 ; i < paths.length ; i++) {

    paths[i].addEventListener("click", () => { 

        let path = paths[i];
        let id = paths[i].id;

        if (path.getAttribute("title") == country.getAttribute("title")) {
            paths[i].style.fill = "rgb(33, 93, 13)";
            countries.splice(countries.indexOf(path), 1);
            randomCountry();
        }

        else {
            country.style.fill = "rgb(128, 23, 23)";
            countries.splice(countries.indexOf(country), 1);
            randomCountry();
         }

    });
}

function randomCountry() {

    if (countries.length != 0) {
        country = countries[Math.floor(Math.random() * countries.length)];
        requestedCountry.innerHTML = `cliquez sur <strong>${country.getAttribute("title")} </strong>`;
    }
    else {
        requestedCountry.innerHTML = `<strong> FINI </strong>`;
    }

}

// zoom

let zoom = 1;


document.addEventListener('wheel', (e) => {

    if (e.deltaY > 0) {
        svg.style.transform = `translate(${( movX )}px, ${( movY )}px) scale(${zoom -= 0.05} `;
    }
    else {
        svg.style.transform = `translate(${( movX )}px, ${( movY )}px) scale(${zoom += 0.05} `;
    }
});

// movement

let startPosX;
let startPosY;
let PosX;
let PosY;

let down = false;

let movX = 0;
let movY = 0;

document.addEventListener('mousedown', (e) => {

    startPosX = e.clientX;
    startPosY = e.clientY;
    
    down = true;

});

document.addEventListener('mouseup', (e) => {
    down = false;
    body.style.cursor = "default";
});

document.addEventListener('mousemove', (e) => {

    PosX = e.clientX;
    PosY = e.clientY;

    if (down) {

        movX -= (startPosX - PosX) /20;
        movY -= (startPosY - PosY) /20;

        svg.style.transform = `translate(${( movX )}px, ${( movY )}px) scale(${zoom})`;
        body.style.cursor = "grab";

    }

});