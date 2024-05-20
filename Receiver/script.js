const affichageMot = document.querySelector(".affichage-mot");
const nbrEssais = document.querySelector(".nbr-essais b");
const cowboyImage = document.querySelector(".cowboy-image img");
const divJeu = document.querySelector(".div-jeu");


// cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);
const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();
const CUSTOM_NAMESPACE = 'urn:x-cast:cinna';

// Function to handle custom messages
const onCustomMessage = (event) => {
    console.log('Received custom message: ', event.data);
    const letter = event.data;

    // Process the received letter
    if (typeof letter === 'string' && letter.length === 1) {
        initGame(letter);
    } else {
        console.error('Invalid message received: ', letter);
    }
};
// Listen for custom messages
context.addCustomMessageListener(CUSTOM_NAMESPACE, onCustomMessage);

// Start the receiver context
context.start();

// Déclaration des variables du jeu
let motAdeviner, lettresOk, lettresPasOk;
const essaisMax = 6;

const initialiseJeu = () => {
    lettresOk = [];
    lettresPasOk = 0;
    cowboyImage.src = "images/bonhomme-0.jpg";
    nbrEssais.innerText = `${lettresPasOk} / ${essaisMax}`;
    affichageMot.innerHTML = motAdeviner.split("").map(() => `<li class="lettre"></li>`).join("");


}

const choisirMot = () => {
    const { mot , indice, category } = listeDeMots[Math.floor(Math.random() * listeDeMots.length)];
    motAdeviner = mot ;
    document.querySelector(".indice-text b").innerText = indice;
    document.querySelector(".categorie-text b").innerText = category;
    initialiseJeu();
}


const gameOver = (isVictory) => {
    // La petite fenêtre quand le jeu est terminé
    // const modalText = isVictory ? `Vous avez trouvé le mot:` : 'Le mot était:';
    divJeu.querySelector("img").src = `images/${isVictory ? 'happyCowboy' : 'sadCowboy'}.jpg`;
    divJeu.querySelector("h4").innerText = isVictory ? 'Petez-vous les bretelles! Vous êtes un champion!' : 'Ça vole pas haut votre affaire!';
    divJeu.querySelector("p").innerHTML = `${modalText} <b>${motAdeviner}</b>`;
    // divJeu.classList.add("show");
}

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
    //
    // if(lettresPasOk === essaisMax) return gameOver(false);
    // if(lettresOk.length === motAdeviner.length) return gameOver(true);
}



choisirMot();

