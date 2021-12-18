class AlertView {
  #alert = document.querySelector('.alert');
  #duration = 3000;

  show() {
    this.#alert.classList.remove('alert--hidden');
    setTimeout(this.#hide.bind(this), this.#duration);
  }

  #hide() {
    this.#alert.classList.add('alert--hidden');
  }
}

export default new AlertView();
