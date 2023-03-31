const remainingElement = document.getElementById("remaining");
const winedElement = document.getElementById("wined");
const totalWinsElement = document.getElementById("total_wins");

const closeElement = document.getElementById("closeBoxes");
const restartElement = document.getElementById("restartGame");

let settings = {
    tickets: 300,
    winners: 3
}
let state = {
    remaining: settings.tickets,
    wined: 0,
    havePlayed: false,
    numbers_history: [],
    numbers_win: []
}

function updateState () {
    remainingElement.innerText = state.remaining;
    winedElement.innerText = state.wined;
    totalWinsElement.innerText = settings.winners;
}

// init logic
updateState();

for (let i = 0; i < settings.winners; i++) {
    let number = null;
    do {
        number = Math.floor(Math.random() * settings.tickets) + 1;
    } while (number == null || state.numbers_win.includes(number));
    state.numbers_win.push(number);
}

function restartGame () {
    window.location.reload();
}
function closing () {
    settings.havePlayed = false;
    closeElement.style.display = "none";

    for (let i = 1; i < 4; i++) {
        let box = document.getElementById(`box${i}`);
        let box_state = document.getElementById(`box${i}_state`);
        box.style.display = "flex";
        box_state.style.display = "none";
    }
    // remet les cadeaux en visibilité
}

function handler (id) {
    if (settings.havePlayed)
        return;

    let box = document.getElementById(id);
    let box_state = document.getElementById(`${id}_state`);

    // fait disparaitre le cadeau cliqué
    box.style.display = "none";

    // empèche de cliquer sur les autres cadeaux
    settings.havePlayed = true;


    let number = null;
    do {
        number = Math.floor(Math.random() * settings.tickets) + 1;
    } while (number == null || state.numbers_history.includes(number));

    state.numbers_history.push(number);

    if (state.numbers_win.includes(number)) {
        state.wined++;
        box_state.style.display = "flex";
        box_state.innerText = "Gagné !";
        box_state.style.color = "green";
        // show win
    } else {
        box_state.style.display = "flex";
        box_state.innerText = "Perdu !";
        box_state.style.color = "red";
        // show lose
    }


    state.remaining--;
    if (state.remaining === 0 || state.wined === settings.winners) {
        restartElement.style.display = "block";
    } else {
        closeElement.style.display = "block";
    }

    updateState();
}

box1.addEventListener("click", handler.bind(null, 'box1'));
box2.addEventListener("click", handler.bind(null, 'box2'));
box3.addEventListener("click", handler.bind(null, 'box3'));