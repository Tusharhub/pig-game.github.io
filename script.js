'use strict';

let currentscore = 0;
let activeplayer = 0;
let scores = [0, 0];
let playing = true;
//Selecting elements

const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
const score0el = document.querySelector('#score--0');
const score1el = document.getElementById('score--1');
const diceel = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

//starting elements

//rolling Function
let rollfunc = function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //display dice
    diceel.classList.remove('hidden');
    diceel.src = `dice-${dice}.png`;

    //checked for Roll-1
    if (dice != 1) {
      //add number in Currentscore
      currentscore = currentscore + dice;
      document.querySelector(`#current--${activeplayer}`).textContent =
        currentscore;
    } else {
      currentscore = currentscore + dice;
      switchplayer();
    }
  }
};
//switch function
const switchplayer = function () {
  document.querySelector(`#current--${activeplayer}`).textContent = 0;
  currentscore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  //changing background colour
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};
//Newgame function
const newgame = function () {
  currentscore = 0;
  activeplayer = 0;
  scores = [0, 0];
  playing = true;

  score0el.textContent = 0;
  score1el.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceel.classList.add('hidden');
  player0el.classList.remove('player--winner');
  player1el.classList.remove('player--winner');
  player0el.classList.add('player--active');
  player1el.classList.remove('player--active');
};

//Rolling Dice functionality
btnroll.addEventListener('click', rollfunc);

//hold functionaity
btnhold.addEventListener('click', function () {
  if (playing) {
    //add the currentscore to activeplayers's scores
    scores[activeplayer] += currentscore;
    document.querySelector(`#score--${activeplayer}`).textContent =
      scores[activeplayer];

    //check for atleast score >=30
    if (scores[activeplayer] >= 30) {
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      //swicth to the next player
      switchplayer();
    }
  }
});
btnnew.addEventListener('click', newgame);
