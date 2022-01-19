import Controller from './controllers/Controller.js';

class App {
  #controller = new Controller();

  start() {
    this.#controller.init();
  }
}

const app = new App();

app.start();
