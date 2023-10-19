const body = document.querySelector("body");
let currentTry = 0;
let tries = [[]];

// pick a new word on page load but also when we won or loose
let wordToFind = getRandomWord();

const button = document.createElement('button')
const main = document.querySelector('.main')
button.textContent = "Restart"
main.appendChild(button)
button.classList.add('button')

const authorizedLetters = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
];
const cellsText = document.getElementsByClassName("cell");
const cellsClass = document.querySelectorAll(".container div");
const keys = Array.from(document.getElementsByClassName("default"));

body.addEventListener("keydown", keypressed);
keys.forEach(key => {
    key.addEventListener("click", event => {
        event.target.classList.add("pressed");
        setTimeout(() => {
            event.target.classList.remove("pressed");
        }, 200);
    });
});

function getRandomWord() {
    const randomNum = Math.floor(Math.random() * wordsToFind.length);
    return wordsToFind[randomNum].toUpperCase();
}

/**
 * Check when user press a key and then update the cell and the array of current try
 * @param {KeyboardEvent} event
 */
function keypressed(event) {
    // block input after last try
    if (currentTry === 6) {
        return;
    }
    if (authorizedLetters.includes(event.key) && tries[currentTry].length < 5) {
        cellsText[tries[currentTry].length + 5 * currentTry].textContent = event.key.toUpperCase();
        cellsClass[tries[currentTry].length + 5 * currentTry].classList.add("unchecked");

        // make the animation run again
        if ((cellsClass[tries[currentTry].length + 5 * currentTry].classList.includes = "uncheckedDelete")) {
            cellsClass[tries[currentTry].length + 5 * currentTry].classList.remove("uncheckedDelete");
        }

        tries[currentTry].push(event.key.toUpperCase()); // push key to the array after you put key into the cell!
    } else if (event.key === "Backspace") {
        if (tries[currentTry].length === 0) {
            return;
        }
        tries[currentTry].pop();
        cellsText[tries[currentTry].length + 5 * currentTry].textContent = "";
        cellsClass[tries[currentTry].length + 5 * currentTry].classList.remove("unchecked");
        cellsClass[tries[currentTry].length + 5 * currentTry].classList.add("uncheckedDelete");
    } else if (event.key === "Enter") {
        checkWord();
    }
}

function checkWord() {
    const currentWord = tries[currentTry]; // ["A", "P", "P", "L", "E"] => "APPLE"

    if (currentWord.length < 5) {
        alert(`Word "${currentWord.join("")}" is too short !!`);
        return;
    }

    if (!wordsToFind.includes(currentWord.join("").toLowerCase())) {
        alert(`Word "${currentWord.join("")}" does not exist !!`);
        return;
    }

    checkLetters(tries);
}

/**
 * Add the classes to the html cells
 *
 * TODO: add the classes to the keyboard too @Tierra
 * @param {Array} word list of tries
 */
function checkLetters(word) {
    let lettersInWord = word[currentTry];
    let cells = document.querySelectorAll(".cell");

    for (let i = 0; i < lettersInWord.length; i++) {
        if (wordToFind.includes(lettersInWord[i]) !== true) {
            cells[i + 5 * currentTry].classList.replace("unchecked", "checked-false");
            checkKeyboard(lettersInWord[i], "checked-false");
        }

        if (wordToFind.includes(lettersInWord[i]) && lettersInWord[i] !== wordToFind[i]) {
            cells[i + 5 * currentTry].classList.replace("unchecked", "checked-misplaced");
            checkKeyboard(lettersInWord[i], "checked-misplaced");
        }

        if (wordToFind.includes(lettersInWord[i]) && lettersInWord[i] === wordToFind[i]) {
            cells[i + 5 * currentTry].classList.replace("unchecked", "checked-placed");
            checkKeyboard(lettersInWord[i], "checked-placed");
        }
    }

    checkIfWon();
}

function checkKeyboard(letter, newClass) {
    let keyboardLetter = document.querySelectorAll(".default");
    for (let i = 0; i < keyboardLetter.length; i++) {
        if (letter === keyboardLetter[i].innerText) {
            keyboardLetter[i].classList.add(newClass);
        }
    }
}

/**
 * Check if the word is correct or add a new try
 */
function checkIfWon() {
    currentTry += 1;
    tries.push([]);

    if (tries[currentTry - 1].join("") === wordToFind) {
        alert("You Won!");
        currentTry = 6;
        // TODO: make a beautiful winning popup @Esther
        return;
    }

    if (currentTry === 6) {
        alert(`Game over! the word was "${wordToFind}"`);
        // TODO: check if lost and popup with retry button @Esther
        return;
    }
}

/**
 * Make keyboard function
 *
 * TODO: make the backspace key work @Esther
 * TODO: add animation
 *
 * @param {HTMLElement} keys
 */
function updateCell(keys) {
    // block input after last try
    if (currentTry === 6) {
        return;
    }
    if (authorizedLetters.includes(keys.innerText.toLowerCase()) && tries[currentTry].length < 5) {
        cellsText[tries[currentTry].length + 5 * currentTry].textContent = keys.innerText.toUpperCase();
        cellsClass[tries[currentTry].length + 5 * currentTry].classList.add("unchecked");
        if ((cellsClass[tries[currentTry].length + 5 * currentTry].classList.includes = "uncheckedDelete")) {
            cellsClass[tries[currentTry].length + 5 * currentTry].classList.remove("uncheckedDelete");
        }
        tries[currentTry].push(keys.innerText.toUpperCase());

        // add the letter inside the html
    } else if (keys.innerText === "Backspace") {
        tries[currentTry].pop();
    } else if (keys.innerText === "Enter") {
        checkWord();
    }
    
}

const backspaceBtn = document.querySelector('.backspace')
    backspaceBtn.addEventListener('click', (e) => {
        // tries[currentTry].pop();
        if (tries[currentTry].length === 0) {
            return;
        }
        tries[currentTry].pop();
        cellsText[tries[currentTry].length + 5 * currentTry].textContent = "";
        cellsClass[tries[currentTry].length + 5 * currentTry].classList.remove("unchecked");
        cellsClass[tries[currentTry].length + 5 * currentTry].classList.add("uncheckedDelete");
        console.log(tries)
})


// console.log(document.querySelector('.backspace'))

button.addEventListener('click', () => {
    currentTry = 0;
    tries = [[]];

    Array.from(cellsText).forEach(cell  => {
        cell.textContent = ''
        cell.classList = 'cell'
    })

    keys.forEach(key => {
        key.classList.remove('checked-false', 'checked-misplaced', 'checked-placed')
    })

    wordToFind = getRandomWord()

    // console.log(getRandomWord())
    console.log(wordToFind)

    button.blur() //problem fixed!!!


// after i click on Restart and starting typing again, 
// focus remains on the button and if i press enter, 
// it will restart even if i dont want to!!!
// NEED TO FIX!!!!
})

