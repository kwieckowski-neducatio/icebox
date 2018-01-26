import ENV from './_env';

class Particle {
  constructor(limit) {
    this.frozen = false;
    this.position = {
      x: ENV.randomBetween(2, limit-1),
      y: ENV.randomBetween(2, limit-1)
    }
    this.obj = document.createElement("DIV");
    this.obj.style.width = ENV.scale + "px";
    this.obj.style.height = ENV.scale + "px";

    this.draw();
  }

  freeze() {
    this.frozen = true;
    this.obj.style.backgroundColor = "lightblue";
  }

  draw() {
    // this.obj.style.left = ((this.position.x - 1) * ENV.scale) + "px";
    // this.obj.style.top  = ((this.position.y - 1) * ENV.scale) + "px";
    this.obj.style.transform  = `translate(${ (this.position.x - 1) * ENV.scale }px , ${ (this.position.y - 1) * ENV.scale }px)`;
  }

  move(direction) {
    switch (direction) {
      case 0: this.position.y -= 1; break;
      case 1: this.position.x += 1; break;
      case 2: this.position.y += 1; break;
      case 3: this.position.x -= 1; break;
    }

    this.draw();
  }

}

export default Particle;
