"use strict";
const player1 = document.querySelector(".player--1");
const player2 = document.querySelector(".player--2");
const player1Name = document.getElementById("name--1");
const player2Name = document.getElementById("name--2");
const player1Score = document.getElementById("score--1");
const player2Score = document.getElementById("score--2");
const player1Current = document.getElementById("current--1");
const player2Current = document.getElementById("current--2");
const diceImage = document.querySelector("img");
const resetBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

const players = document.querySelectorAll(".player");
let activePlayer = [player1, player2].filter((player) => {
    return player.classList.contains("player--active");
})[0];
let pig = false;

let scoreTracker = {
    "player--1": {
        player: player1,
        name: player1Name,
        scoreLabel: player1Score,
        currentScoreLabel: player1Current,
        score: 0,
        current: 0,
    },
    "player--2": {
        player: player2,
        name: player2Name,
        scoreLabel: player2Score,
        currentScoreLabel: player2Current,
        score: 0,
        current: 0,
    },
};

const resetGame = () => {
    diceImage.classList.add("hidden");
    rollBtn.disabled = false;
    holdBtn.disabled = true;

    player1Name.textContent = "Player 1";
    player2Name.textContent = "Player 2";

    player1.classList.remove("player--winner");
    player2.classList.remove("player--winner");

    player1.classList.add("player--active");
    player2.classList.remove("player--active");

    [player1Score, player1Current, player2Score, player2Current].forEach(
        (element) => {
            element.textContent = 0;
        }
    );

    scoreTracker["player--1"] = {
        ...scoreTracker["player--1"],
        score: 0,
        current: 0,
    };
    scoreTracker["player--2"] = {
        ...scoreTracker["player--2"],
        score: 0,
        current: 0,
    };
};

const updatePlayerScore = (score = null) => {
    const playerName = activePlayer.classList[1];
    if (score) {
        scoreTracker[playerName].score += score;
    } else {
        scoreTracker[playerName].score = 0;
    }
    scoreTracker[playerName].scoreLabel.textContent =
        scoreTracker[playerName].score;
};

const updatePlayerCurrentScore = () => {
    const playerName = activePlayer.classList[1];
    scoreTracker[playerName].current += scoreTracker[playerName].score;
    scoreTracker[playerName].currentScoreLabel.textContent =
        scoreTracker[playerName].current;

    if (scoreTracker[playerName].current >= 100) {
        scoreTracker[playerName].player.classList.add("player--winner");
        scoreTracker[playerName].name.textContent = "Winner!";
        rollBtn.disabled = true;
        holdBtn.disabled = true;
    }
};

const switchPlayer = () => {
    if (pig) {
        rollBtn.disabled = true;
        updatePlayerScore();
        pig = false;

        setTimeout(() => {
            rollBtn.disabled = false;
        }, 1125);
    } else {
        updatePlayerCurrentScore();
        updatePlayerScore();
    }

    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active");

    activePlayer = [player1, player2].filter((player) => {
        return player.classList.contains("player--active");
    })[0];
};

const rollDice = () => {
    holdBtn.disabled = false;
    const diceNumber = Math.ceil(Math.random() * 6);
    diceImage.src = `./dice/dice-${diceNumber}.png`;
    diceImage.classList.remove("hidden");

    if (diceNumber === 1) {
        holdBtn.disabled = true;
        pig = true;
        switchPlayer();
    } else {
        updatePlayerScore(diceNumber);
    }
};

resetBtn.addEventListener("click", resetGame);
rollBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", switchPlayer);
