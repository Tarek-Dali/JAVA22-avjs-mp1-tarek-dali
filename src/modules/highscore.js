import _ from "underscore";
let playerName = '';
let sortedScores;

const url = 'https://ajsminiprojekt1-default-rtdb.europe-west1.firebasedatabase.app/highscore.json';
//Brings the name from gameMechanics
export function playerNameBringer(name) {
    playerName = name;
}
// Gets the highscore board from firebase, sorts it then displays it
export async function getFirebase(playerPoints) {

    document.querySelector('#scores').innerHTML = '';
    const div = document.querySelector('#scores');
    div.innerHTML = '';

    await sortData(playerPoints);

    sortedScores = _.sortBy(sortedScores, 'score').reverse();
    for (let i = 0; i < sortedScores.length; i++) {
        const h2 = document.createElement('h2');
        h2.innerText = sortedScores[i].name + " : " + sortedScores[i].score;
        div.append(h2);
    }
}
//Sort data function
export function sortData(playerPoints) {
    return new Promise(async resolve => {

        const response = await fetch(url);
        const data = await response.json();

        sortedScores = _.sortBy(data, 'score');

        if (sortedScores.some(obj => obj.name === playerName)) {
            for (let i = 0; i < sortedScores.length; i++) {
                if (sortedScores[i].name == playerName && sortedScores[i].score < playerPoints) {
                    sortedScores[i].score = playerPoints;
                    break;
                }
            }

        } else {
            for (let i = 0; i < sortedScores.length; i++) {
                if (sortedScores[i].score < playerPoints) {
                    sortedScores[i].name = playerName;
                    sortedScores[i].score = playerPoints;
                    break;
                }
            }
        }
        sortedScores = _.sortBy(sortedScores, 'score');
        resolve();
    })
}
//Sorts data then puts it as an array
export async function putFirebase(playerPoints) {
    console.log('Before sort and put');
    console.log(sortedScores.reverse());
    await sortData(playerPoints);
    console.log('After sort and put')
    console.log(sortedScores);

    const options = {
        method: 'PUT',
        body: JSON.stringify(sortedScores),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    await fetch(url, options);
}
