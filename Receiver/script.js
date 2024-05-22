const context = cast.framework.CastReceiverContext.getInstance();
const CHANNEL1 = 'urn:x-cast:cinna';

// Add an element to display messages
const options = new cast.framework.CastReceiverOptions();
options.customNamespaces = Object.assign({});
options.customNamespaces[CHANNEL1] = cast.framework.system.MessageType.JSON;
options.disableIdleTimeout = true;

window.onload = function() {

    options.customNamespaces = {
        'urn:x-cast:cinna': cast.framework.system.MessageType.JSON
    };

    context.start(options);

    const gameStatusElement = document.getElementById('letters');

    context.addCustomMessageListener(CHANNEL1, event => {
        const letter = event.data.letter;

        // Update the game status with the received letter
        gameStatusElement.innerText = 'Received letter: ' + letter;
    });
};


// Existing game code
const affichageMot = document.querySelector(".affichage-mot");
const nbrEssais = document.querySelector(".nbr-essais b");
const cowboyImage = document.querySelector(".cowboy-image img");
const divJeu = document.querySelector(".div-jeu");

// Déclaration des variables du jeu
let motAdeviner, lettresOk, lettresPasOk;
const essaisMax = 6;

const initialiseJeu = () => {
    lettresOk = [];
    lettresPasOk = 0;
    cowboyImage.src = "images/bonhomme-0.jpg";
    nbrEssais.innerText = `${lettresPasOk} / ${essaisMax}`;
    affichageMot.innerHTML = motAdeviner.split("").map(() => `<li class="lettre"></li>`).join("");
};

const choisirMot = () => {
    const { mot , indice, category } = listeDeMots[Math.floor(Math.random() * listeDeMots.length)];
    motAdeviner = mot;
    document.querySelector(".indice-text b").innerText = indice;
    document.querySelector(".categorie-text b").innerText = category;
    initialiseJeu();
};

const gameOver = (isVictory) => {
    // La petite fenêtre quand le jeu est terminé
    const modalText = isVictory ? `Vous avez trouvé le mot:` : 'Le mot était:';
    divJeu.querySelector("img").src = `images/${isVictory ? 'happyCowboy' : 'sadCowboy'}.jpg`;
    divJeu.querySelector("h4").innerText = isVictory ? 'Petez-vous les bretelles! Vous êtes un champion!' : 'Ça vole pas haut votre affaire!';
    divJeu.querySelector("p").innerHTML = `${modalText} <b>${motAdeviner}</b>`;
    divJeu.classList.add("show");
};

const initGame = (letter) => {
    // Checking if clicked letter exists in the motAdeviner
    if (motAdeviner.includes(letter)) {
        // Showing all correct letters on the word display
        [...motAdeviner].forEach((char, index) => {
            if (char === letter) {
                lettresOk.push(char);
                affichageMot.querySelectorAll("li")[index].innerText = char;
                affichageMot.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist, then update the lettresPasOk and hangman image
        lettresPasOk++;
        cowboyImage.src = `images/bonhomme-${lettresPasOk}.jpg`;
    }
    nbrEssais.innerText = `${lettresPasOk} / ${essaisMax}`;

    if (lettresPasOk === essaisMax) return gameOver(false);
    if (lettresOk.length === motAdeviner.length) return gameOver(true);
};

// Start the game by choosing a word
choisirMot();
