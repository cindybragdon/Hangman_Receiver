const affichageMot = document.querySelector(".affichage-mot");
const nbrEssais = document.querySelector(".nbr-essais b");
const clavier = document.querySelector(".clavier");
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
    // clavier.querySelectorAll("bouton").forEach(btn => btn.disabled = false);
    divJeu.classList.remove("show");
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
    const modalText = isVictory ? `Vous avez trouvé le mot:` : 'Le mot était:';
    divJeu.querySelector("img").src = `images/${isVictory ? 'happyCowboy' : 'sadCowboy'}.jpg`;
    divJeu.querySelector("h4").innerText = isVictory ? 'Petez-vous les bretelles! Vous êtes un champion!' : 'Ça vole pas haut votre affaire!';
    divJeu.querySelector("p").innerHTML = `${modalText} <b>${motAdeviner}</b>`;
    divJeu.classList.add("show");
}

const initGame = (bouton, clickedlettre) => {
    // Checking if clickedlettre is exist on the motAdeviner
    if(motAdeviner.includes(clickedlettre)) {
        // Showing all correct lettres on the word display
        [...motAdeviner].forEach((lettre, index) => {
            if(lettre === clickedlettre) {
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
    bouton.disabled = true; // Disabling the clicked bouton so user can't click again
    nbrEssais.innerText = `${lettresPasOk} / ${essaisMax}`;

    // Calling gameOver function if any of these condition meets
    if(lettresPasOk === essaisMax) return gameOver(false);
    if(lettresOk.length === motAdeviner.length) return gameOver(true);
}

// Creating clavier boutons and adding event listeners
// for (let i = 97; i <= 122; i++) {
//     const bouton = document.createElement("bouton");
//     bouton.innerText = String.fromCharCode(i);
//     clavier.appendChild(bouton);
//     bouton.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
// }

choisirMot();
rejouerBtn.addEventListener("click", choisirMot);

const context = cast.framework.CastReceiverContext.getInstance();
context.addCustomMessageListener('urn:x-cast:cinna', event => {
    const message = event.data;
    if (message.type === 'LETTER_PICKED') {
        const letter = message.letter;
        console.log('Received letter:', letter);
        // Call the function to update the game based on the received letter
        initGame(letter);
    }
});

context.start();