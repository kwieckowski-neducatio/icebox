import ENV from './_env';

class Icebox {
  constructor(container, size) {
    this.container = container;
    this.width = size;
    this.height = size;

    this.render();
  }

  render() {
    this.container.style.width = (this.width * ENV.scale) + 'px';
    this.container.style.height = (this.height * ENV.scale) + 'px';

    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}

export default Icebox;
