'use strict';
import './style.scss';
import Icebox from './icebox';
import Board from './board';
import Particle from './particle';

const startButton = document.querySelector('.controls button');
const boxsizeInput = document.querySelector('.controls [name="boxsize"]');
const partcountInput = document.querySelector('.controls [name="partcount"]');
const iceboxContainer = document.querySelector('.icebox');

const run = () => {
  const size = boxsizeInput.value;
  const icebox = new Icebox(iceboxContainer, size);

  let particles = [];
  for (var i = 0; i < Number(partcountInput.value); i++) {
    particles.push(new Particle(size));
  }

  const board = new Board(size, iceboxContainer, particles);

  board.moveParticles();
}
startButton.onclick = run;
