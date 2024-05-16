const affichageMot = document.querySelector(".affichage-mot");
const nbrEssais = document.querySelector(".nbr-essais b");
const cowboyImage = document.querySelector(".cowboy-image img");
const divJeu = document.querySelector(".div-jeu");
const rejouerBtn = divJeu.querySelector("bouton");

// Déclaration des variables du jeu
let motAdeviner, lettresOk, lettresPasOk;
const essaisMax = 6;

const initialiseJeu = () => {
    lettresOk = [];
    lettresPasOk = 0;
    cowboyImage.src = "images/bonhomme-0.jpg";
    nbrEssais.innerText = `${lettresPasOk} / ${essaisMax}`;
    affichageMot.innerHTML = motAdeviner.split("").map(() => `<li class="lettre"></li>`).join("");

    divJeu.classList.remove("show");
}

const choisirMot = () => {
    const { mot , indice, category } = listeDeMots[Math.floor(Math.random() * listeDeMots.length)];
    motAdeviner = mot ;
    document.querySelector(".indice-text b").innerText = indice;
    document.querySelector(".categorie-text b").innerText = category;
    initialiseJeu();
}

var w = window.innerWidth;
var h = window.innerHeight;

var x = document.getElementById("demo");

x.innerHTML = "Browser width: " + w + ", height: " + h + ".";

// const gameOver = (isVictory) => {
//     // La petite fenêtre quand le jeu est terminé
//     const modalText = isVictory ? `Vous avez trouvé le mot:` : 'Le mot était:';
//     divJeu.querySelector("img").src = `images/${isVictory ? 'happyCowboy' : 'sadCowboy'}.jpg`;
//     divJeu.querySelector("h4").innerText = isVictory ? 'Petez-vous les bretelles! Vous êtes un champion!' : 'Ça vole pas haut votre affaire!';
//     divJeu.querySelector("p").innerHTML = `${modalText} <b>${motAdeviner}</b>`;
//     divJeu.classList.add("show");
// }

const initGame = ( lettre) => {
    // Checking if clickedlettre is exist on the motAdeviner
    if(motAdeviner.includes(lettre)) {
        // Showing all correct lettres on the word display
        [...motAdeviner].forEach((lettre, index) => {
            if(lettre === lettre) {
                lettresOk.push(lettre);
                affichageMot.querySelectorAll("li")[index].innerText = lettre;
                affichageMot.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked lettre doesn't exist then update the lettresPasOk and hangman image
        lettresPasOk++;
        cowboyImage.src = `images/bonhomme-${lettresPasOk}.jpg`;
    }
    nbrEssais.innerText = `${lettresPasOk} / ${essaisMax}`;

    if(lettresPasOk === essaisMax) return gameOver(false);
    if(lettresOk.length === motAdeviner.length) return gameOver(true);
}



choisirMot();

rejouerBtn.addEventListener("click", choisirMot);

const context = cast.framework.CastReceiverContext.getInstance();
context.addCustomMessageListener('urn:x-cast:cinna', event => {
    const message = event.data;
    if (message.type === 'LETTER_PICKED') {
        const lettre = message.lettre;

        initGame(lettre);
    }
});

context.start();