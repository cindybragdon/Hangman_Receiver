const context = cast.framework.CastReceiverContext.getInstance();

// Add an element to display messages
const messageElement = document.getElementById('letters');

context.addCustomMessageListener('urn:x-cast:cinna', event => {
    const message = event.data;
    if (message.type === 'initialize') {
        // Respond to the initialization message
        event.source.postMessage({
            type: 'receiverReady'
        });
        // Update the message element to indicate initialization
        messageElement.innerText = 'Receiver initialized';
    } else if (message.type === 'LETTER_PICKED') {
        const letter = message.letter;
        initGame(letter);
        // Update the message element to show the received letter
        messageElement.innerText = `Received letter: ${letter}`;
    }
});

context.start();


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
