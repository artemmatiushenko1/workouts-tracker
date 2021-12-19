export class AlertView {
  #alert = document.querySelector('.alert');
  static DURATION_SHORT = 1000;
  static DURATION_MEDIUM = 3000;
  static DURATION_LONG = 6000;

  show(message, duration) {
    this.#alert.innerHTML = `<strong>Error!</strong> ${message}`;
    this.#alert.classList.remove('alert--hidden');
    setTimeout(this.#hide.bind(this), duration);
  }

  #hide() {
    this.#alert.classList.add('alert--hidden');
  }
}

export default new AlertView();
