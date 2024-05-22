const context = cast.framework.CastReceiverContext.getInstance();
const CHANNEL1 = 'urn:x-cast:cinna';

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
        gameStatusElement.innerText = 'Lettre recu : ' + letter;
        initGame(letter);
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
    cowboyImage.src = "images/hangman-0.png";
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


const initGame = (letter) => {
    if (motAdeviner.includes(letter)) {
        [...motAdeviner].forEach((char, index) => {
            if (char === letter) {
                lettresOk.push(char);
                affichageMot.querySelectorAll("li")[index].innerText = char;
                affichageMot.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        lettresPasOk++;
        cowboyImage.src = `images/hangman-${lettresPasOk}.png`;
    }
    nbrEssais.innerText = `${lettresPasOk} / ${essaisMax}`;

    setTimeout(()=> {
        if (lettresPasOk === essaisMax) return choisirMot();
        if (lettresOk.length === motAdeviner.length) return choisirMot()
    },2000);

};


choisirMot();
