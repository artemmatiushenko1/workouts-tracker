class AlertView {
  #alert = document.querySelector('.alert');

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
