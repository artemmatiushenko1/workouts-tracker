export class Workout {
  #date = new Date();
  #id = Date.now().toString();

  constructor(distance, duration, coords) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }

  setDesctiption() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${
      months[this.#date.getMonth()]
    } ${this.#date.getDate()}`;
  }

  getId() {
    return this.#id;
  }

  getDate() {
    return this.#date;
  }

  getDistance() {
    return this.distance;
  }

  getDuration() {
    return this.duration;
  }

  getCoords() {
    return this.coords;
  }
}
