/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



//DOM Selector;

const sE = (elem) => document.querySelector(elem);

///////////////////////////////////////////////////////////

//Variables

let scores, roundScore, activePlayer, gamePlaying;

init();

/////////////////////////////////////////////////////////////


//Events

sE('.btn-roll').addEventListener('click', () => {

        if (gamePlaying) {
            //Random number
            let dice = Math.floor(Math.random() * 6) + 1;

            //Display the result
            let diceDOM = sE('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = `dice-${dice}.png`;

            //Update the result if the rolled number wasn't 1
            if(dice !== 1){
                //Add score
                roundScore += dice;
                sE(`#current-${activePlayer}`).textContent = roundScore;
            } else {
                //Next player
                nextPlayer();
            }
        }

});

sE('.btn-hold').addEventListener('click', () => {

    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore

        //Update the UI
        sE(`#score-${activePlayer}`).textContent = scores[activePlayer];
        nextPlayer;

        //Check if player won the game
        if(scores[activePlayer] >= 100){
            sE(`#name-${activePlayer}`).textContent = 'Winner!';
            sE('.dice').style.display = 'none';
            sE(`.player-${activePlayer}-panel`).classList.add('winner');
            sE(`.player-${activePlayer}-panel`).classList.remove('remove');
            gamePlaying = false;
        } else{
            nextPlayer();
        }
    }

})

sE('.btn-new').addEventListener('click', init)

///////////////////////////////////////////////////////

//functions

function nextPlayer(){
    (activePlayer === 0) ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    sE('current-0').textContent = '0';
    sE('current-1').textContent = '0';

    sE('.player-0-panel').classList.toggle('active');
    sE('.player-1-panel').classList.toggle('active');

    sE('.dice').style.display = 'none'
}

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    //DOM Manipulation

    sE('.dice').style.display = 'none';
    sE('score-0').textContent = '0';
    sE('score-1').textContent = '0';
    sE('current-0').textContent = '0';
    sE('current-1').textContent = '0';
    sE(`#name-0`).textContent = 'Player 1';
    sE(`#name-1`).textContent = 'Player 2';
    sE(`.player-0-panel`).classList.remove('winner');
    sE(`.player-0-panel`).classList.remove('active');
    sE(`.player-1-panel`).classList.remove('winner');
    sE(`.player-1-panel`).classList.remove('active');
    sE('.player-0-panel').classList.add('active');
}

//////////////////////////////////////////