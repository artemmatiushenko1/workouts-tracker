class App {
  #name;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }
}

const app = new App('App');
console.log(app);
console.log(app.getName());
