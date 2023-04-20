import { playerNameBringer } from "./highscore.js";
import { getFirebase } from "./highscore.js";
import { putFirebase } from "./highscore.js";


const arrayRPS = ['rock', 'paper', 'scissor'];

const inputAll = document.querySelectorAll('input');
const imagesAll = document.querySelectorAll('img');
const button = document.querySelector('#nameButton');
const h2All = document.querySelectorAll('h2');
const h1All = document.querySelectorAll('h1');
const p = document.querySelector('#comfort');

const playerName = h1All[0];
const result = h1All[1];

const rock = inputAll[1];
const paper = inputAll[2];
const scissor = inputAll[3];

//Input pictures
const imgUrlRock = new URL('../media/rock.png', import.meta.url);
rock.src = imgUrlRock.href;
const imgUrlPaper = new URL('../media/paper.png', import.meta.url);
paper.src = imgUrlPaper.href;
const imgUrlScissor = new URL('../media/scissors.png', import.meta.url);
scissor.src = imgUrlScissor.href;

const rockAI = imagesAll[0];
const paperAI = imagesAll[1];
const scissorAI = imagesAll[2];

const playerPH2 = h2All[0];
//Exports to main
export function gameFunctions() {
    //Input for getting name value
    button.addEventListener('click', event => {
        event.preventDefault();

        if (inputAll[0].value != '') {
            playerName.innerText = inputAll[0].value;
            const form = document.querySelector('form');
            form.classList.remove('namePrompt');
            result.innerText = '';
            playerNameBringer(inputAll[0].value);
        }
        inputAll[0].value = '';
    });

    let playerPoints = 0;
    let aiPoints = 0;
    let random = 0;
    //Displays leaderboard from firebase
    getFirebase(playerPoints);
    //Cheat +1 point button
    document.querySelector('#cheat').addEventListener('click', event => {
        playerPoints++;
        playerPH2.innerText = playerPoints;
        p.innerText = "Psst, sometimes it's ok to cheat";
    })
    //Mechanics for rock paper scissor
    document.querySelector('div').addEventListener('click', event => {
        if (event.target.id === 'rock' || event.target.id === 'paper' || event.target.id === 'scissor') {
            event.preventDefault();
            rock.toggleAttribute('disabled');
            paper.toggleAttribute('disabled');
            scissor.toggleAttribute('disabled');
            result.innerText = '';
            random = Math.round(Math.random() * 2);
        }

        //Calls on winning conditions based on choice
        if (event.target.id === 'rock') {
            rockIfElse(random);
        } else if (event.target.id === 'paper') {
            paperIfElse(random);
        } else if (event.target.id === 'scissor') {
            scissorIfElse(random);
        }


        if (aiPoints == 1) {
            result.innerText = `${playerName.innerText} has won ${playerPoints} points\nTo play again just choose a weapon.`;

            p.innerText = '';

            //Compares highscores and if any changes are made puts it firebase and gets it

            putFirebase(playerPoints);
            getFirebase(playerPoints);

            playerPoints = 0;
            aiPoints = 0;

        }
        playerPH2.innerText = playerPoints;
    });
    //Winning conditions
    function rockIfElse(random) {
        if (arrayRPS[random] == 'scissor') {
            rock.style.background = 'green';
            scissorAI.style.background = 'red';
            playerPoints++;
        } else if (arrayRPS[random] == 'paper') {
            rock.style.background = 'red';
            paperAI.style.background = 'green';
            aiPoints++;
        } else {
            rock.style.background = 'orange';
            rockAI.style.background = 'orange';
        }
        reverseColor();
    }

    function paperIfElse(random) {
        if (arrayRPS[random] == 'rock') {
            paper.style.background = 'green';
            rockAI.style.background = 'red';
            playerPoints++;
        } else if (arrayRPS[random] == 'scissor') {
            paper.style.background = 'red';
            scissorAI.style.background = 'green';
            aiPoints++;
        } else {
            paper.style.background = 'orange';
            paperAI.style.background = 'orange';
        } reverseColor();
    }

    function scissorIfElse(random) {
        if (arrayRPS[random] == 'paper') {
            scissor.style.background = 'green';
            paperAI.style.background = 'red';
            playerPoints++;
        } else if (arrayRPS[random] == 'rock') {
            scissor.style.background = 'red';
            rockAI.style.background = 'green';
            aiPoints++;
        } else {
            scissor.style.background = 'orange';
            scissorAI.style.background = 'orange';
        } reverseColor();
    }

    function reverseColor() {
        setTimeout(function background() {
            rock.style.backgroundColor = 'rgb(10, 173, 228)';
            paper.style.backgroundColor = 'rgb(10, 173, 228)';
            scissor.style.backgroundColor = 'rgb(10, 173, 228)';

            rockAI.style.backgroundColor = 'rgb(10, 173, 228)';
            paperAI.style.backgroundColor = 'rgb(10, 173, 228)';
            scissorAI.style.backgroundColor = 'rgb(10, 173, 228)';

            rock.toggleAttribute('disabled');
            paper.toggleAttribute('disabled');
            scissor.toggleAttribute('disabled');
        }, 1000);
    }
}
