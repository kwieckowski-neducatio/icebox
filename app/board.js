import ENV from './_env';

class Board {
  constructor(size, container, particles) {
    this.size = size;
    this.sizeWithBorder = Number(this.size) + 2;
    this.boardArray = [];
    this.particles = particles;
    this.container = container;

    this.clearBoard()

    this.meth = document.querySelector('.controls [name="refreshMethod"]').checked;
    console.log("Using " + { true: "requestAnimationFrame", false: "timeout"}[this.meth]);
  }

  clearBoard() {
    for (var i = 0; i < this.sizeWithBorder; i++) {
      this.boardArray[i] = [];
      for (var j = 0; j < this.sizeWithBorder; j++) {
        this.boardArray[i][j] = (i===0 || i===(this.sizeWithBorder-1) || j===0 || j===(this.sizeWithBorder-1)) ? [{ frozen: true }] : []; // 'wall' or void
      }
    }

    this.placeParticles();
  }

  placeParticles() {
    for (let particle of this.particles) {
      this.boardArray[particle.position.x][particle.position.y].push(particle);
      this.container.appendChild(particle.obj);
    }

    // console.log(this.boardArray);
  }

  moveParticles() {
    let shouldRepeat = false;

    for (let particle of this.particles) {
      if (!particle.frozen) {
        this.boardArray[particle.position.x][particle.position.y].pop();
        // console.log("before", JSON.stringify(particle.position));
        let dir = Math.floor(Math.random() * 4);
        particle.move(dir);
        // console.log("moved " + {0: "up", 1: "right", 2: "down", 3: "left"}[dir], JSON.stringify(particle.position));
        this.boardArray[particle.position.x][particle.position.y].push(particle);

        let froze = this.checkParticleStatus(particle);
        if (!froze && !shouldRepeat) {
          shouldRepeat = true;
        }
      }
    }

    if (shouldRepeat) {

      if (!this.meth) {
        setTimeout(() => { this.moveParticles(); }, ENV.interval);
      } else {
        requestAnimationFrame(this.moveParticles.bind(this));
      }
    } else {
      // console.log(this.boardArray);
    }
  }

  checkParticleStatus(p) {
    for (var i = p.position.x - 1; i <= p.position.x + 1; i++) {
      for (var j = p.position.y - 1; j <= p.position.y + 1; j++) {
        // console.log("status", i, j, this.boardArray[i][j]);
        if (this.boardArray[i][j] &&
            this.boardArray[i][j].length &&
            this.boardArray[i][j][0].frozen) {
          p.freeze();
          return true;
        }
      }
    }
    return false;
  }
}

export default Board;
