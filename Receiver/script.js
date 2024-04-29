const hangmanImages = [
    './image/bonhomme00.png',
    './image/bonhomme11.png',
    './image/bonhomme22.png',
    './image/bonhomme33.png',
    './image/bonhomme44.png',
    './image/bonhomme55.png',
    './image/bonhomme66.png'
];
let word = 'HELLO'; // Word to guess
let guessedWord = '_'.repeat(word.length); // Guessed letters so far
let guesses = 0; // Number of wrong guesses

function updateDisplay() {
    document.getElementById('word').innerText = guessedWord;
    document.getElementById('hangmanImage').src = hangmanImages[guesses];
}

function guessLetter(letter) {
    if (word.includes(letter)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                guessedWord = guessedWord.substring(0, i) + letter + guessedWord.substring(i + 1);
            }
        }
    } else {
        guesses++;
    }
    updateDisplay();
}

const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

playerManager.setMessageInterceptor(
    cast.framework.messages.MessageType.CUSTOM, message => {
        const messageData = message.data;
        if (messageData.type === 'guess') {
            guessLetter(messageData.data.letter);
        }
        return message;
    }
);

context.start();
updateDisplay();