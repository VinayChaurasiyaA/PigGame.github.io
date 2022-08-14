'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore , activePlayer , playing;
// function for switching of the players
const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle is used if the player0 has playeractive it will remoce and if it doesn't
  // it will just add and doing to both at the same time ensures that one will atleaset be there
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// for intialiszation
const init = function(){
  
  // starting Conditions
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

// scores is created for adding all the current values whenever the hold is preseed
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
    
};

init();
// Rolling functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // creating a dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display the dice roll
    diceEl.classList.remove('hidden');
    // here src will make the html soource image changed
    diceEl.src = `dice-${dice}.png`;
    // checking whether it is 1 or not
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to the next player and make current score = 0
      switchPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // if it is then finish the game
      // 3.Switch to the next player
      switchPlayers();
    }
  }
});
btnNew.addEventListener('click' , init);
